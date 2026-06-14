// Greatest Common Divisor
const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    console.log("b: ", b, " a: ", a, " a % b: ", a % b);
    return b === 0 ? a : gcd(b, a % b);
}
console.log(gcd(36, 5));
console.log(gcd(36, 6));

// Least Common Multiple
const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
};

console.log(lcm(36, 6));

