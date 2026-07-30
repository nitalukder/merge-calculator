# 📜 Changelog

All notable changes to the **Strict Zero-Waste Merge Calculator** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.1] - 2026-07-31

### ✨ Improved
* **UI Layout Restructuring:** Relocated the validation error alert box from above the inputs to **below the input fields**, ensuring a cleaner and more natural layout flow.

---

## [1.3.0] - 2026-07-31

### ✨ Improved
* **Smart Error Timing & UX:** Introduced a `touched` state tracking system. Error alerts no longer pop up prematurely while typing or backspacing intermediate values, eliminating abrupt UI layout jumps.
* **Smooth Transitions:** Added Alpine.js enter/leave transitions to the validation error banner for smooth visual feedback.

---

## [1.2.0] - 2026-07-31

### ✨ Added
* **Light / Dark Mode Switcher:** Dynamic theme toggle button in the header with correct icon rendering (`x-show`).
* **Theme Persistence:** Stores selected theme preferences in `localStorage`.
* **Light Theme UI:** Custom light palette with clear text contrast, soft shadows, and clean borders.

---

## [1.1.0] - 2026-07-31

### ✨ Added
* **Two-Column Responsive Grid Layout:** Desktop view split into input and output columns to prevent vertical scrolling.
* **Interactive Stepper Buttons:** Integrated `-` and `+` buttons alongside input fields for faster value adjustments.
* **Smart Auto-Sync Watchers:** Implemented Alpine.js `$watch` handlers for real-time reactive clamping.
* **Input Bounds Protection:** Added upper threshold ($q \le 1,000,000$) to prevent JavaScript integer overflow.

---

## [1.0.0] - 2026-07-30

### 🎉 Initial Release
* Core Zero-Waste Math Engine implementation based on the 5-to-2 merge ratio.
* Reactive UI using Alpine.js.
* Single-column container design with dynamic validation alerts.
* Step-by-step merge simulation proof trace table.
