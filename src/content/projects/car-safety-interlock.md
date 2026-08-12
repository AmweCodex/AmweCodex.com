---
title: "Car Safety Interlock System"
summary: "An embedded safety interlock that blocks vehicle startup until required safety checks — like the seatbelt — are confirmed."
cover: "/images/projects/car-safety-interlock.svg"
stack: ["Microcontrollers", "Embedded C", "Safety Logic", "Interrupts"]
date: 2024-03-18
---

## Overview

This project explores hardware-enforced safety logic: rather than just
displaying a warning light, the ignition circuit itself is gated behind a
microcontroller that checks a set of safety conditions before it will
permit engine start.

## How it works

Digital inputs monitor the safety-relevant switches (seatbelt buckle
sensor, door-closed sensor). The firmware treats these as hardware
interrupts rather than polling in a loop, so a state change is caught
immediately rather than on the next poll cycle. Only once every required
condition reports "safe" does the microcontroller enable the ignition
relay; otherwise it holds it open and drives a warning indicator.

## Design notes

Using interrupts instead of polling was a deliberate real-time design
choice: safety logic should react to a state change as soon as it happens,
not wait for the next pass through a loop that might also be busy doing
something else. The interlock is fail-safe by default — on power-up, or if
a sensor reading looks invalid, the ignition relay defaults to
locked-out rather than assuming the vehicle is safe.

## Challenges

Debouncing the seatbelt buckle switch was more involved than expected —
a mechanical switch can chatter for several milliseconds when it closes,
and without debouncing that chatter can be misread as the belt
unbuckling and rebuckling rapidly. This was solved with a short
software debounce window on the interrupt handler.

## Result

A working benchtop prototype that correctly withholds ignition until every
monitored safety condition is satisfied, and correctly re-locks the
ignition the moment a condition becomes unsafe again — demonstrating the
core logic a real interlock system would need.
