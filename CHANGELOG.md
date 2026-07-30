# 📜 Changelog

All notable changes to the **Strict Zero-Waste Merge Calculator** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-07-31

### ✨ Added
* **Two-Column Responsive Grid Layout:** Desktop view split into input and output columns to prevent vertical scrolling.
* **Interactive Stepper Buttons:** Integrated `-` and `+` buttons alongside input fields for faster value adjustments.
* **Smart Auto-Sync Watchers:** Implemented Alpine.js `$watch` handlers for real-time reactive clamping:
  * Automatically pushes $t$ to $s + 1$ if $s \ge t$.
  * Automatically pulls $s$ to $t - 1$ if $t \le s$.
* **Input Bounds Protection:** Added upper threshold ($q \le 1,000,000$) to prevent JavaScript integer overflow ($MAX\_SAFE\_INTEGER$).
* **Mobile UX Enhancements:** Added `inputmode="numeric"` and accessible `aria-label` attributes to stepper buttons.

### 🛠️ Changed
* Updated UI framework implementation to **Tailwind CSS v4** engine.
* Set default requested quantity $q$ to `1`.
* Enhanced error handling with auto-adjustments instead of passive alert banners.

---

## [1.0.0] - 2026-07-30

### 🎉 Initial Release
* Core Zero-Waste Math Engine implementation based on the 5-to-2 merge ratio.
* Reactive UI using Alpine.js.
* Single-column container design with dynamic validation alerts.
* Step-by-step merge simulation proof trace table.
