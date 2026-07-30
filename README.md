# 🚀 Strict Zero-Waste Merge Calculator (`v1.1.0`)

A fast, lightweight, zero-dependency web application designed to calculate the exact required base items for 5-to-2 merge games without leaving leftover waste items at any tier.

## 🛠 Tech Stack

* **UI Framework:** HTML5 + [Tailwind CSS v4 Browser CDN](https://tailwindcss.com)
* **Reactivity Engine:** [Alpine.js v3](https://alpinejs.dev)
* **Architecture:** Modular Separation of Concerns (Zero-Build Dynamic Static Site)

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

## 📜 Version History

See the [CHANGELOG.md](./CHANGELOG.md) file for a detailed history of changes and version releases.
