---
title: "Starting My PLC Journey"
summary: "Why I'm moving from microcontrollers into industrial PLCs, and what I'm hoping to learn along the way."
cover: "/images/blog/starting-my-plc-journey.svg"
tags: ["PLC", "Career", "Automation"]
date: 2026-08-13
---

After building a handful of microcontroller projects — an irrigation
controller, a fault detector, a safety interlock — I kept running into the
same thought: industrial automation runs on a completely different set of
tools than the Arduino-and-breadboard world I'd been working in. So I've
started a PLC Programming Certification to properly learn that world from
the ground up, and I'm going to document the journey here.

## Why PLCs, and not just "more microcontrollers"

A microcontroller project is usually one board, one program, running once.
An industrial PLC is designed to run for years inside a factory,
control physical machinery that can genuinely hurt someone if it does
the wrong thing, and be swapped out or reprogrammed by a technician who
didn't write the original code. That's a different discipline — the
hardware is built for reliability first, and the programming model
(ladder logic) is built to be read by an electrician on a factory floor,
not just a software engineer.

## What I already know

From my embedded systems background, I already understand:

- Digital and analog I/O at the hardware level
- Debouncing, interrupts, and real-time constraints
- Control-system fundamentals

## What I'm learning next

- **PLC architecture** — how a PLC's scan cycle actually works, and why
  that changes how you have to think about writing logic compared to a
  microcontroller's main loop.
- **Ladder logic** — reading and writing rungs, contacts, and coils.
- **Timers and counters** — the PLC-native way of handling delays and
  counting events, which map to different concepts than what I'm used to
  in C++.

I'll be posting as I work through each of these — partly so future-me has
notes to look back on, and partly in case it helps anyone else making the
same jump from embedded systems into industrial automation.
