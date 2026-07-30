/**
 * Alpine.js Main Controller Engine
 * Version: v1.4.0
 */

import { CONFIG } from './config.js';
import { calculateMetrics } from './calculator.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('mergeCalculator', () => ({
        s: 1,
        t: 4,
        q: 1,
        touched: false,
        theme: localStorage.getItem('theme') || 'dark',
        copied: false,

        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', this.theme);
        },

        init() {
            this.$watch('s', (val) => {
                this.touched = true;
                if (val === '' || val === null || isNaN(val)) return;
                let numS = Math.floor(Number(val));
                
                if (numS < CONFIG.MIN_START_LEVEL) {
                    this.s = CONFIG.MIN_START_LEVEL;
                    numS = CONFIG.MIN_START_LEVEL;
                } else if (numS !== val) {
                    this.s = numS;
                }

                if (numS >= this.t) {
                    this.t = numS + 1;
                }
            });

            this.$watch('t', (val) => {
                this.touched = true;
                if (val === '' || val === null || isNaN(val)) return;
                let numT = Math.floor(Number(val));

                if (numT < CONFIG.MIN_TARGET_LEVEL) {
                    this.t = CONFIG.MIN_TARGET_LEVEL;
                    numT = CONFIG.MIN_TARGET_LEVEL;
                } else if (numT !== val) {
                    this.t = numT;
                }

                if (numT <= this.s) {
                    this.s = Math.max(CONFIG.MIN_START_LEVEL, numT - 1);
                }
            });

            this.$watch('q', (val) => {
                this.touched = true;
                if (val === '' || val === null || isNaN(val)) return;
                let numQ = Math.floor(Number(val));

                if (numQ < CONFIG.MIN_QUANTITY) {
                    this.q = CONFIG.MIN_QUANTITY;
                } else if (numQ > CONFIG.MAX_QUANTITY) {
                    this.q = CONFIG.MAX_QUANTITY;
                } else if (numQ !== val) {
                    this.q = numQ;
                }
            });
        },

        decS() { this.touched = true; if (this.s > CONFIG.MIN_START_LEVEL) this.s--; },
        incS() { this.touched = true; this.s++; },
        decT() { this.touched = true; if (this.t > CONFIG.MIN_TARGET_LEVEL) this.t--; },
        incT() { this.touched = true; this.t++; },
        decQ() { this.touched = true; if (this.q > CONFIG.MIN_QUANTITY) this.q--; },
        incQ() { this.touched = true; if (this.q < CONFIG.MAX_QUANTITY) this.q++; },

        get error() {
            if (!this.touched) return null;

            if (this.s === '' || this.t === '' || this.q === '' || this.s === null || this.t === null || this.q === null) {
                return 'সবগুলো ইনপুট ফিল্ড পূরণ করা আবশ্যক।';
            }
            if (!Number.isInteger(Number(this.s)) || !Number.isInteger(Number(this.t)) || !Number.isInteger(Number(this.q))) {
                return 'ইনপুট সংখ্যাগুলো অবশ্যই পূর্ণসংখ্যা (Integer) হতে হবে।';
            }
            if (this.s < CONFIG.MIN_START_LEVEL || this.q < CONFIG.MIN_QUANTITY) {
                return 'Start Level এবং Quantity অন্তত ১ হতে হবে।';
            }
            if (this.t <= this.s) {
                return 'Target Level (t) অবশ্যই Start Level (s)-এর চেয়ে বড় হতে হবে।';
            }
            if (this.d > CONFIG.MAX_LEVEL_JUMP) {
                return `লেভেল জাম্প (t - s) সর্বোচ্চ ${CONFIG.MAX_LEVEL_JUMP} এর মধ্যে রাখতে হবে।`;
            }
            if (this.q > CONFIG.MAX_QUANTITY) {
                return 'Quantity সর্বোচ্চ ১০,০০,০০০ (1,000,000) পর্যন্ত দেওয়া সম্ভব।';
            }
            return null;
        },

        get metrics() {
            if (this.error) return { d: 0, b: 0, qAuto: 0, N: 0, steps: [] };
            return calculateMetrics(this.s, this.t, this.q);
        },

        get d() { return this.metrics.d; },
        get b() { return this.metrics.b; },
        get qAuto() { return this.metrics.qAuto; },
        get N() { return this.metrics.N; },
        get steps() { return this.metrics.steps; },

        copyResults() {
            if (this.error) return;
            const summary = `Strict Zero-Waste Merge Calculator Summary (v1.4.0)\n` +
                          `--------------------------------------------------\n` +
                          `• Start Level (s): ${this.s}\n` +
                          `• Target Level (t): ${this.t}\n` +
                          `• Requested Quantity (q): ${this.q}\n` +
                          `• Level Jump (d): ${this.d}\n` +
                          `• Batches Needed (b): ${this.b.toLocaleString()}\n` +
                          `• Auto Target (q_auto): ${this.qAuto.toLocaleString()}\n` +
                          `• Start Items (N): ${this.N.toLocaleString()}`;

            navigator.clipboard.writeText(summary).then(() => {
                this.copied = true;
                setTimeout(() => { this.copied = false; }, 2000);
            });
        }
    }));
});
