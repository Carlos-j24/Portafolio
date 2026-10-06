---
title: "DevForge"
date: 2026-10-05
period: 2026
role: "Personal project · in development"
stack: [PowerShell 7, Windows PowerShell 5.1, Pester, GitHub Actions, Spec-Driven Development]
repo: https://github.com/Carlos-j24/DevForge
image: /projects/devforge.webp
readingTime: 4
summary: "A personal development ecosystem in PowerShell: Doctor diagnoses the environment without touching anything, and Init installs a harness in any project so AI agents follow its rules."
---

## The problem

Before starting work on a project, two questions always come back: **do I have everything I need installed?** and, since I started working with AI agents, **does the agent know how this project works?** The first was answered by trying commands by hand; the second, by repeating the same context in every conversation.

DevForge answers both with two command-line tools, written in PowerShell and **with no external dependencies**.

## What it does (v0.2.0)

- **DevForge Doctor** checks Git, PowerShell 7, VS Code, Python, Node.js, Docker and Ollama, and gives an overall status: ready, ready with warnings, or errors. It works in the console and with `-Json` for scripts and agents. With `-Project <path>` it also checks a project's AI harness.
- **DevForge Init** installs that harness (`AGENTS.md`, `CLAUDE.md` and `MEMORY.md`) in any project, **detecting its stack** (Django, Python, Vue, Node.js, PowerShell) at the root and in first-level subfolders, along with their test commands.

![DevForge Init simulating the harness installation in a Django + Vue project](/gallery/devforge/init.webp)

*Init with `-WhatIf`: it detects Django and Vue in subfolders and shows what it would do without writing anything.*

## Architecture

```text
scripts/
  core/     ToolCheck (shared model) and console output
  doctor/   Invoke-DevForgeDoctor.ps1
              checks -> ToolCheck[] -> console | JSON | exit code
  init/     Invoke-DevForgeInit.ps1
              stack detection -> templates -> AGENTS.md, CLAUDE.md, MEMORY.md
templates/harness/   editable harness templates
specs/NNN-*/         spec, plan, tasks and validation for each module
tests/               Pester, on PowerShell 7 and Windows PowerShell 5.1
```

## Decisions that matter

### Diagnosing is not modifying

It's the first principle of the project's constitution: **a check never installs, changes or deletes anything**. Doctor can run on any machine without fear, and any future repair will be explicit, optional and ask for confirmation.

### Logic separated from presentation

Each check returns a `ToolCheck` object (name, category, version, whether it's required, status and message) and **only the orchestrator prints**. That way the console and the JSON come from the same data, and the tests check the logic without parsing screen text.

### Contracts that don't break

The exit codes (`0` all good, `1` warnings, `2` errors) and the JSON schema are a **public contract**: scripts and agents depend on them. So they only grow in compatible ways. When Doctor learned to check the harness, it did so with a new category (`HARNESS`) that changes nothing that came before.

### Init is safe by design

Init **only writes those three files**, never overwrites an existing one without `-Force`, running it twice changes nothing, and with `-WhatIf` it shows what it would do while exiting with the same code as a real run. One test snapshots the folder before and after to prove it touches nothing else.

### Compatible with Windows PowerShell 5.1

Many Windows machines still only have version 5.1. Keeping compatibility taught me something: `.ps1` files with accented characters must be saved as **UTF-8 with BOM**, or 5.1 reads them wrong ("estÃ¡").

## How it was built

With **Spec-Driven Development**: each module has a spec with verifiable requirements, a plan, tasks and a **validation** document linking every requirement to its test. There are three specs so far: Doctor (written after the code and kept up to date), Init and the harness check. If a test passes on the first try, I break the code on purpose to check the test catches it.

The result: **116 Pester tests**, which GitHub Actions runs on PowerShell 7 and 5.1 on every pull request.

I cover the AI-agents side of the work in the article [DevForge: how I work with AI agents without losing control](/blog/devforge-ia-con-specs).

## Real-world use

The first real project was MedAlert. Init with `-WhatIf` uncovered a stray `package.json` at its root, and completing the harness surfaced a time-zone bug in reminder sending. Doctor, for its part, raised a false positive on DevForge itself that is already noted for a future spec.

## What's next

Version 0.3.0, **Professional Workspace**, focuses on setting up the full environment: VS Code configuration, recommended extensions and local models with Ollama, Continue and Cline.
