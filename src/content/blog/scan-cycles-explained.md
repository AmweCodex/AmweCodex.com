---
title: "Scan Cycles, Explained the Way I Wish Someone Had Explained Them to Me"
summary: "Breaking down the PLC scan cycle — input scan, logic solve, output scan — and why the order matters."
cover: "/images/blog/scan-cycles-explained.svg"
tags: ["PLC", "Scan Cycle", "Fundamentals"]
date: 2026-03-15
---

Every PLC concept I've learned so far eventually traces back to one idea:
the scan cycle. So this post is just that, on its own, explained the way I
wish someone had explained it to me before I tried to learn timers and
ladder logic on top of it.

## The three phases

On every single scan, a PLC repeats the same three-step loop:

1. **Input scan** — read the current state of every physical input (every
   sensor, switch, button wired to the PLC) and copy those values into an
   internal input table.
2. **Program/logic solve** — evaluate the ladder logic program, rung by
   rung, top to bottom, using the input table from step 1. Any outputs the
   logic decides on get written to an internal output table — not
   directly to the physical output yet.
3. **Output scan** — copy the internal output table out to the actual
   physical outputs (relays, indicator lights, actuators) all at once.

Then it goes straight back to step 1 and repeats, continuously, for as
long as the PLC is running.

## Why the "copy it first, write it out later" order matters

If the PLC updated a physical output the instant a rung decided on it,
inputs read later in the same scan could see an inconsistent, half-updated
system. Locking inputs at the start of the scan and only committing
outputs at the end means every rung in a given scan is reasoning about the
exact same, consistent snapshot of the world — which is what makes ladder
logic predictable to reason about, rung by rung, even though physical
inputs are technically changing in real time underneath it.

## What this means practically

It means a rung near the bottom of the program can react to another rung's
output earlier in the *same* scan (since it already updated the internal
table), but it will always be looking at input values from the start of
this scan, not this exact instant. For most factory-floor timescales — a
scan cycle typically completes in well under a second — this is invisible.
But it's the reason a PLC programmer has to think about *rung order*,
something I never had to think about writing straight-line C++ code.
