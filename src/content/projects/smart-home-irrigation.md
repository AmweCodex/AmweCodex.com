---
title: "Smart Home Irrigation System"
summary: "An Arduino-based irrigation controller that reads soil moisture in real time and only waters when the soil actually needs it."
cover: "/images/projects/smart-home-irrigation.svg"
stack: ["Arduino", "C++", "Soil Moisture Sensor", "Relay Module", "Water Pump"]
date: 2024-11-10
---

## Overview

Most irrigation timers water on a fixed schedule whether the soil needs it or
not — wasting water on rainy days and under-watering during heat waves. This
project replaces the timer with a feedback loop: a soil moisture sensor
tells the controller the actual state of the soil, and the controller
decides whether to run the pump.

## How it works

1. A capacitive soil moisture sensor is buried at root depth and polled
   every few minutes.
2. The Arduino compares the reading against a configurable "dry" threshold.
3. If the soil is drier than the threshold, a relay module switches on a
   12V water pump for a fixed, safe duration — long enough to soak the
   root zone without flooding it.
4. Readings and pump events are logged over serial for tuning the
   threshold during testing.

## Firmware design notes

The moisture threshold and watering duration are both defined as named
constants at the top of the sketch, not hard-coded inline — so the system
can be re-tuned for a different plant or pot size without touching the
control logic itself. The relay is driven through a transistor stage rather
than directly from a digital pin, since the pump's inrush current exceeds
what an Arduino GPIO pin can safely source.

## Challenges

The biggest challenge was sensor drift: capacitive sensors report slightly
different raw values depending on soil type and temperature, so a single
hard-coded threshold didn't generalise. The fix was a short calibration
routine — dip the sensor in dry soil and then saturated soil, record both
readings, and use that range to normalise future readings into a 0–100%
scale instead of relying on raw ADC values.

## Result

A pump cycle only fires when it's actually needed, cutting unnecessary
watering events compared to a fixed schedule, while keeping the soil in
the target moisture band during testing.
