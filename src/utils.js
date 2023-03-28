
function floatingPointEquals(a, b) {
    return Math.abs(a-b) <= Number.EPSILON
}

module.exports = { floatingPointEquals }