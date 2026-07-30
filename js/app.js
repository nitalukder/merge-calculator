/**
 * Strict Zero-Waste Merge Calculator Engine
 * Powered by Alpine.js
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('mergeCalculator', () => ({
        // 1. Core Reactive States
        s: 1, // Start Level (s)
        t: 4, // Target Level (t)
        q: 3, // Requested Quantity (q)

        // 2. Computed Level Jump (d = t - s)
        get d() {
            return this.t - this.s;
        },

        // 3. Real-time Input Validation Engine
        get error() {
            // Null or empty check
            if (this.s === '' || this.t === '' || this.q === '' || this.s === null || this.t === null || this.q === null) {
                return 'সবগুলো ইনপুট ফিল্ড পূরণ করা আবশ্যক।';
            }
            // Non-integer check
            if (!Number.isInteger(this.s) || !Number.isInteger(this.t) || !Number.isInteger(this.q)) {
                return 'ইনপুট সংখ্যাগুলো অবশ্যই পূর্ণসংখ্যা (Integer) হতে হবে।';
            }
            // Minimum value bounds
            if (this.s < 1 || this.q < 1) {
                return 'Start Level এবং Quantity অন্তত ১ হতে হবে।';
            }
            // Target level strict inequality
            if (this.t <= this.s) {
                return 'Target Level (t) অবশ্যই Start Level (s)-এর চেয়ে বড় হতে হবে।';
            }
            // Level difference safeguard
            if (this.d > 15) {
                return 'লেভেল জাম্প (t - s) সর্বোচ্চ ১৫ এর মধ্যে রাখতে হবে।';
            }
            return null; // Valid state
        },

        // 4. Zero-Waste Formulas (5-to-2 Ratio)
        get b() {
            if (this.error) return 0;
            return Math.ceil(this.q / Math.pow(2, this.d));
        },

        get qAuto() {
            if (this.error) return 0;
            return this.b * Math.pow(2, this.d);
        },

        get N() {
            if (this.error) return 0;
            return this.b * Math.pow(5, this.d);
        },

        // 5. Step-by-step Merge Simulation Trace
        get steps() {
            if (this.error) return [];
            const list = [];
            let cur = this.N;

            for (let lvl = this.s; lvl < this.t; lvl++) {
                const next = Math.floor(cur / 5) * 2;
                list.push({
                    lvl: lvl,
                    nextLvl: lvl + 1,
                    cur: cur,
                    next: next,
                    waste: cur % 5
                });
                cur = next;
            }
            return list;
        }
    }));
});
