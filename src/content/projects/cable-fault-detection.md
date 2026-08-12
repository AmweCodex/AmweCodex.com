---
title: "Cable Fault Detection System"
summary: "An embedded diagnostic tool that detects and pinpoints fault locations along electrical and signal cabling to cut troubleshooting time."
cover: "/images/projects/cable-fault-detection.svg"
stack: ["Embedded Systems", "Signal Processing", "Sensors", "Fault Diagnostics"]
date: 2024-06-02
---

## Overview

Locating a fault in a long run of cable by hand — cutting and testing
section by section — is slow and destructive. This project builds a
diagnostic instrument that estimates fault location electronically, so a
technician knows roughly where to start looking before opening anything up.

## How it works

The system injects a known test signal into the cable under test and reads
the response at the sending end. Faults (breaks, shorts, or degraded
insulation) change the signal's reflection characteristics in a
predictable way, so the embedded system's signal-processing stage
interprets those changes to estimate both the type of fault and its
approximate distance along the cable.

## Design notes

Keeping the analog front-end clean was the priority here: noise on the
sensing line looks a lot like a real fault signature, so the signal path
was kept short, shielded, and isolated from the digital side of the board
to avoid clock noise bleeding into the measurement.

## Challenges

Distinguishing a genuine fault reflection from ordinary cable-length
attenuation was the hardest part — a long healthy cable and a short faulty
one can produce superficially similar readings. This was addressed by
calibrating the baseline response against a known-good reference cable of
the same type before taking a fault measurement, so the system compares
against a real baseline rather than a theoretical one.

## Result

A working prototype that reliably flags fault presence and gives a
distance estimate accurate enough to dramatically narrow down where a
technician should start physically inspecting the cable, instead of
testing it blind, section by section.
