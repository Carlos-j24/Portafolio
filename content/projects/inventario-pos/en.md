---
title: "Inventario-POS"
date: 2026-10-19
period: 2026
role: "Personal project · full stack · in progress"
stack: [Django, Django REST Framework, PostgreSQL, React 19, TypeScript, PWA, IndexedDB, Vitest, pytest, Docker, GitHub Actions]
repo: https://github.com/Carlos-j24/Inventario-POS
image: /projects/inventario-pos.webp
readingTime: 5
summary: "Inventory and point of sale for hardware stores: warehouse, checkout, orders, reports and e-invoicing, with a register that keeps selling even when the internet goes down."
---

## The problem

In a hardware store, inventory rarely adds up. Cable is bought by the roll and sold by the meter, cement goes out by the bag, and goods come in, move between warehouses and get damaged without any record. And if the internet goes down, **the register can't stop selling**.

Inventario-POS covers the store's daily work in a single web app that installs like a native one: **warehouse receipts, sales that deduct stock, a register with cash count, salesperson-to-register orders, reports and users with roles**. It targets hardware stores first; supermarkets and pharmacies come later.

## What it does

- **Register (POS)** with barcode scanner, mixed payment (cash, card and bank transfer), change, shifts per physical register and **cash count** with shortages and surpluses.
- **Orders**: the salesperson builds the order and gets a 4-digit code, and the register charges it. The sale records who sold it and who charged it.
- **Warehouse**: receipts, stock with minimum-level alerts, **blind counts**, adjustments that need approval and transfers between warehouses.
- **Unit conversion**: buy by the roll, sell by the meter (1 roll = 100 m).
- **Reports**: sales by day, register, salesperson and payment method; best sellers and products with no movement; inventory valued at weighted average cost; margins; and CSV export for Excel.
- **Supervision**: voids, returns, an inbox of sales to review, users and **editable roles**.
- **Colombian e-invoicing (DIAN)** in progress: numbering per register, POS document and invoice, credit notes, a send queue, offline contingency and an 80 mm receipt with QR code. For now it runs against a simulated provider until the real one is chosen.

## Architecture

```text
+----------------- Browser (React PWA) ------------------+
| Register · Warehouse · Reports · Admin                 |
| IndexedDB: catalog, prices and pending sales           |
| Service worker: the app opens without internet         |
+--------------+---------------------------^-------------+
               | sync queue                | catalog and stock
               | (idempotent POST)         |
+--------------v---------------------------+-------------+
| Django + DRF                                           |
| accounts · catalog · inventory · sales · cash · DIAN   |
| services.py: business rules inside transactions        |
+--------------+-----------------------------------------+
               |
               v
          PostgreSQL        (Docker: gunicorn + WhiteNoise)
```

## Decisions that matter

### Inventory is a ledger, not a number

Stock isn't stored as a number that gets overwritten. Every receipt, sale, return, adjustment or transfer is a **stock ledger movement** with its cost, its user and its real date, and the balance is a cache that only one function touches. That function **locks the row** while writing (`select_for_update`), so two registers selling the same product at the same time don't overwrite each other. Concurrency tests run only against PostgreSQL, because SQLite ignores locks.

### A register without internet keeps selling

The service worker opens the app with no network, and the catalog lives in IndexedDB. Every sale carries a **UUID generated in the browser**: if it can't be sent, it waits in a queue and retries on its own. If the first attempt did arrive, the server recognizes it and **doesn't duplicate it**. Rather than block a sale, the system accepts negative stock and flags the sale for review. It does the same with offline sales of a product that was already counted or deactivated.

### Fixed permissions, editable roles

The code defines concrete permissions (`inventory.receive`, `sales.void`, `reports.costs`...) and the administrator combines them into whatever roles the store needs, without touching code. Someone without pricing permission can create a product, but it stays **pending price** and inactive until an authorized user sets one.

### Prices include VAT

That's how prices are displayed in a hardware store. The register adds up totals and the backend splits the base price from the VAT. Money always travels as text with two decimals, never as a floating-point number.

## Quality

- **455 pytest tests** (backend) and **182 Vitest tests** (frontend).
- CI runs on every PR with **5 required checks**: pytest on Python 3.12 and 3.14, the full suite against PostgreSQL, the frontend (tests and types) and a smoke test of the Docker image.
- Built with **Spec-Driven Development**: seven specs with their plans and tasks, and more than 50 reviewed pull requests.

## Screenshots

All with the demo data in the repo (`manage.py seed_demo`): a made-up hardware store with two weeks of sales.

![Register with a sale in progress of cement, cable by the meter and other products](/gallery/inventario-pos/caja.webp)

*The register: cable by the meter, cement by the bag and barcode scanner.*

![Monthly sales report by day and by payment method](/gallery/inventario-pos/reportes.webp)

*Monthly reports: net sales, VAT, returns and payment methods.*

![Stock with products below their minimum highlighted](/gallery/inventario-pos/existencias.webp)

*Stock per warehouse, flagging what needs to be reordered.*

![Inbox of offline sales that need review](/gallery/inventario-pos/revision.webp)

*An offline sale with a price different from the catalog's is flagged for review.*

## What I take away

1. **An offline system is designed from day one.** A UUID per document and idempotent submissions can't be added later without rebuilding sales.
2. **Tests have to run where production runs.** Locks and some errors only showed up in the PostgreSQL job, never in SQLite.
3. **A test that passes on the first try doesn't prove anything yet.** A rounding test with round prices (3,200) always passed: the lost cent only appeared with prices like 3,199.99. That's why every new test is checked by introducing a bug on purpose.
