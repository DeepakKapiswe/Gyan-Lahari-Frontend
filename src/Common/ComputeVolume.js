export function computeExpectedCurrVol() {
    const f = new Date();
    return (f.getFullYear()-2000) * 4 + Math.ceil(f.getMonth()/3);
};