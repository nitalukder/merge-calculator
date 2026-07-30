# 🚀 Strict Zero-Waste Merge Calculator

A fast, lightweight, zero-dependency web tool designed to calculate exact required base items for 5-to-2 merge games without leaving leftover items at any tier.

## 🛠 Tech Stack

* **UI Framework:** HTML5 + [Tailwind CSS CDN](https://tailwindcss.com) (via `@layer` component abstraction)
* **Reactivity Engine:** [Alpine.js](https://alpinejs.dev)
* **Architecture:** Modular Separation of Concerns (No Build Step Required)

## 📐 Formulas Implemented

Given:
* **Start Level** ($s$)
* **Target Level** ($t$)
* **Requested Quantity** ($q$)

1. **Level Difference ($d$):**
   $$d = t - s$$

2. **Batch Count ($b$):**
   $$b = \lceil \frac{q}{2^d} \rceil$$

3. **Auto-Target Quantity ($q_{auto}$):**
   $$q_{auto} = b \cdot 2^d$$

4. **Required Level $s$ Items ($N$):**
   $$N = b \cdot 5^d$$
