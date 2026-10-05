---
title: "DevForge: how I work with AI agents without losing control"
date: 2026-10-05
readingTime: 5
tags: [DevForge, AI, Spec-Driven Development, PowerShell, Testing]
summary: "What I learned building DevForge: a harness that makes AI agents follow each project's rules, specs before prompts, and tests as the only way out."
---

AI agents write code really fast. Speed isn't the problem; everything else is. Every session starts from scratch, they don't remember what you decided yesterday, they don't know your project's pitfalls, and if you don't set boundaries, they do things you never asked for.

For a while I handled this like almost everyone does: repeating the same context in every conversation. With DevForge I wanted to actually solve it. This article covers what I built, how I work now and, above all, what happened in practice.

## What DevForge is

DevForge is my personal development ecosystem. It's written in PowerShell with no external dependencies, and today (v0.2.0) it has two modules:

- **DevForge Doctor** diagnoses the development environment: Git, PowerShell 7, VS Code, Python, Node.js, Docker and Ollama. It reports to the console or as JSON and exits with a clear code: `0` all good, `1` warnings, `2` error. That way a person, a script or an agent can read it. And one non-negotiable rule: **Doctor never installs, changes or deletes anything**. Diagnosing is not modifying.
- **DevForge Init** installs an "AI harness" into any project with a single command, detecting its stack. With `-Project`, Doctor also checks that the harness is healthy.

## The harness: the agent reads the rules before touching anything

The harness is three files at the project root:

- **`AGENTS.md`**: the project rules. Stack, commands, conventions, known pitfalls and boundaries ("never store keys in the repo", "tests green before calling anything done"). It's the **single source of truth**: Claude Code, OpenCode and any agent that follows the standard read it.
- **`CLAUDE.md`**: it has no rules of its own, it just imports the other two. That way there are never two versions of the truth drifting apart.
- **`MEMORY.md`**: memory across sessions. Current status, decisions and why they were made, mistakes not to repeat. Capped at around 50 lines: memory that grows unchecked stops being useful.

```markdown
# CLAUDE.md
Project instructions live in AGENTS.md (single source of truth).

@AGENTS.md
@MEMORY.md
```

The idea is simple: the agent doesn't start from zero, it starts by reading what the project already knows. And when it learns something new, it writes it down for the next session.

## Specs before prompts

The second piece is **Spec-Driven Development**. Instead of asking an agent to "make me a command that installs the harness", I first write a spec with verifiable requirements, in a *"WHEN X happens, THE SYSTEM does Y"* format:

> **FR-2:** IF a harness file already exists, THEN THE SYSTEM does not modify it and reports it as skipped.
>
> **FR-13:** THE SYSTEM only writes the harness files inside the target project: it does not modify or delete any other file.

Each spec goes through four documents: **spec** (what and why), **plan** (how), **tasks** (in what order) and **validation** (how each requirement was checked). Above all of them sits a **constitution** of seven principles no spec can skip. The last one says: *AI helps, the person decides*. No agent approves its own specs or pushes without human review.

What changed the most for me isn't the format, it's when decisions get made. Questions come up while writing the spec, not halfway through the implementation. "What if `CLAUDE.md` already exists?" or "what if `package.json` is malformed?" get answered before writing a single line of code, and they're recorded as edge cases with their own test.

## Tests as the only gate

No task is done with failing tests. DevForge has Pester tests that run on PowerShell 7 and Windows PowerShell 5.1, and GitHub Actions runs them on every pull request. No green CI, no merge.

There's one rule I learned the hard way: **if a test passes on the first try, I don't trust it**. I break the code on purpose (for example, making Init ignore `-WhatIf` and write anyway) and check that the test catches it. If it doesn't, the test wasn't testing anything.

## What happened in practice

This is the interesting part. The tools didn't just do what the spec said: they uncovered real problems.

- **Init found leftovers in MedAlert.** The first thing I did on a real project was a dry run with `-WhatIf`. It detected Node.js at MedAlert's root, when the frontend lives in `frontend/`. It was a stray `package.json` from an `npm install` run in the wrong folder. Init did exactly what the spec said, and that surfaced a problem in the project.
- **Filling in the harness found a bug.** Init leaves `[COMPLETAR]` ("to fill in") markers wherever it can't infer something. While completing them by reading MedAlert's code, a possible time-zone bug showed up in the WhatsApp reminder sending. It's now logged in its `MEMORY.md`.
- **Doctor flagged a false positive on me.** When checking DevForge's own harness, it warned about a pending marker in `MEMORY.md`. It wasn't one: I had written the marker literally while describing a task. Doctor met the spec (count the text), but the spec fell short. It's already noted as an idea for a future spec: ignore markers written as code.
- **Windows pitfalls go into `AGENTS.md`.** Folders being created as empty files because `-ItemType Directory` was missing. Broken accents in PowerShell 5.1 because `.ps1` files need UTF-8 *with* BOM. .NET functions that don't know PowerShell's current folder. Each of these happened once, and now it's written where the agent reads it before starting.

## What I take away

1. **Context gets written down, not repeated.** If I have to explain something to an agent twice, it goes into `AGENTS.md` or `MEMORY.md`.
2. **A spec is a prompt that outlives the session.** And it can be reviewed, discussed and validated.
3. **Public contracts aren't changed lightly.** Doctor's exit codes and JSON schema only change with a major version, because scripts and agents depend on them.
4. **AI speeds things up, but the judgment is still mine.** Agents write a large part of the code; I decide what gets built, review every PR and never merge anything red.

## What's next

The next version, v0.3.0 *Professional Workspace*, focuses on setting up the full environment: VS Code configuration, recommended extensions and local models with Ollama, Continue and Cline.

The code is on GitHub: [Carlos-j24/DevForge](https://github.com/Carlos-j24/DevForge). If you work with AI agents and have your own way of keeping them in check, I'd love to hear about it.
