---
title: "Ladder Logic: My First Timers and Counters"
summary: "Notes on how PLC timers and counters actually work, and where my C++ instincts got in the way at first."
cover: "/images/blog/ladder-logic-first-timers-counters.svg"
tags: ["PLC", "Ladder Logic", "Timers"]
date: 2026-02-20
---

This week's focus was timers (TON/TOF) and counters (CTU/CTD) in ladder
logic. Coming from C++, my first instinct was to think of a timer as
`delay(ms)` — but that's exactly the wrong mental model for a PLC, and it
took a couple of wrong attempts to unlearn it.

## Why `delay()` thinking doesn't work here

A microcontroller running `delay(1000)` blocks — nothing else happens for
that second. A PLC's scan cycle can't afford that: it has to keep scanning
every rung, every cycle, so it can react to real-world inputs continuously.
A timer instruction instead just accumulates elapsed time in the
background, on every scan, while the rest of the program keeps running
normally. You read its current value and compare it, rather than pausing
execution to wait for it.

## TON vs TOF, in plain terms

- **TON (Timer On-Delay)** — starts counting once its input goes true, and
  its output only goes true once the preset time has elapsed. Useful for
  "wait this long before doing X."
- **TOF (Timer Off-Delay)** — the output goes true immediately, but stays
  true for a preset time *after* the input goes false. Useful for "keep
  doing X for a bit after the trigger stops," like a fan that keeps running
  briefly after a machine shuts down.

## Counters

CTU (count up) and CTD (count down) behave closer to what I'd expect from
software — they increment or decrement on each true-going edge of their
input — but the part I had to get used to is that the counter's current
value persists across scans and has to be explicitly reset, rather than
being a local variable that resets itself when a function returns.

## Takeaway

The recurring theme so far: a PLC program isn't "code that runs once
top to bottom", it's a set of rungs that all get re-evaluated on every
single scan. Once that clicked, timers and counters stopped feeling
unfamiliar and started feeling like the obvious way to express "state that
persists across scans."
