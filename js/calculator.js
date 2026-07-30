/**
 * Zero-Waste Math Engine (5-to-2 Ratio)
 * Version: v1.4.0
 */

export function calculateMetrics(s, t, q) {
    const numS = Number(s);
    const numT = Number(t);
    const numQ = Number(q);

    const d = numT - numS;
    const b = Math.ceil(numQ / Math.pow(2, d));
    const qAuto = b * Math.pow(2, d);
    const N = b * Math.pow(5, d);

    const steps = [];
    let cur = N;

    for (let lvl = numS; lvl < numT; lvl++) {
        const next = Math.floor(cur / 5) * 2;
        steps.push({
            lvl: lvl,
            nextLvl: lvl + 1,
            cur: cur,
            next: next,
            waste: cur % 5
        });
        cur = next;
    }

    return { d, b, qAuto, N, steps };
}
