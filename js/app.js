/**
 * Strict Zero-Waste Merge Calculator Engine
 * Version: v1.1.0
 * Powered by Alpine.js
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('mergeCalculator', () => ({
        // 1. Reactive State
        s: 1, // Start Level (Min: 1)
        t: 4, // Target Level (Min: 2)
        q: 1, // Requested Quantity (Min: 1, Max: 1,000,000)

        // 2. Lifecycle Init & Reactive Auto-Sync Watchers
        init() {
            // Watcher for Start Level (s)
            this.$watch('s', (val) => {
                if (val === '' || val === null || isNaN(val)) return;
                let numS = Math.floor(Number(val));
                
                // Clamp min bounds
                if (numS < 1) {
                    this.s = 1;
                    numS = 1;
                } else if (numS !== val) {
                    this.s = numS;
                }

                // Auto-push Target Level (t) if s >= t
                if (numS >= this.t) {
                    this.t = numS + 1;
                }
            });

            // Watcher for Target Level (t)
            this.$watch('t', (val) => {
                if (val === '' || val === null || isNaN(val)) return;
                let numT = Math.floor(Number(val));

                // Clamp min bounds
                if (numT < 2) {
                    this.t = 2;
                    numT = 2;
                } else if (numT !== val) {
                    this.t = numT;
                }

                // Auto-pull Start Level (s) if t <= s
                if (numT <= this.s) {
                    this.s = Math.max(1, numT - 1);
                }
            });

            // Watcher for Requested Quantity (q)
            this.$watch('q', (val) => {
                if (val === '' || val === null || isNaN(val)) return;
                let numQ = Math.floor(Number(val));

                // Clamp bounds (1 <= q <= 1,000,000)
                if (numQ < 1) {
                    this.q = 1;
                } else if (numQ > 1000000) {
                    this.q = 1000000;
                } else if (numQ !== val) {
                    this.q = numQ;
                }
            });
        },

        // 3. Explicit Stepper Action Methods
        decS() {
            if (this.s > 1) this.s--;
        },
        incS() {
            this.s++;
        },
        decT() {
            if (this.t > 2) this.t--;
        },
        incT() {
            this.t++;
        },
        decQ() {
            if (this.q > 1) this.q--;
        },
        incQ() {
            this.q++;
        },

        // 4. Level Jump Calculation (d = t - s)
        get d() {
            return this.t - this.s;
        },

        // 5. Strict Real-time Validation Engine
        get error() {
            if (this.s === '' || this.t === '' || this.q === '' || this.s === null || this.t === null || this.q === null) {
                return 'সবগুলো ইনপুট ফিল্ড পূরণ করা আবশ্যক।';
            }
            if (!Number.isInteger(Number(this.s)) || !Number.isInteger(Number(this.t)) || !Number.isInteger(Number(this.q))) {
                return 'ইনপুট সংখ্যাগুলো অবশ্যই পূর্ণসংখ্যা (Integer) হতে হবে।';
            }
            if (this.s < 1 || this.q < 1) {
                return 'Start Level এবং Quantity অন্তত ১ হতে হবে।';
            }
            if (this.t <= this.s) {
                return 'Target Level (t) অবশ্যই Start Level (s)-এর চেয়ে বড় হতে হবে।';
            }
            if (this.d > 15) {
                return 'লেভেল জাম্প (t - s) সর্বোচ্চ ১৫ এর মধ্যে রাখতে হবে।';
            }
            if (this.q > 1000000) {
                return 'Quantity সর্বোচ্চ ১০,০০,০০০ (1,000,000) পর্যন্ত দেওয়া সম্ভব।';
            }
            return null;
        },

        // 6. Zero-Waste Formulas (5-to-2 Ratio)
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

        // 7. Step Simulation Proof Trace
        get steps() {
            if (this.error) return [];
            const list = [];
            let cur = this.N;

            for (let lvl = Number(this.s); lvl < Number(this.t); lvl++) {
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
