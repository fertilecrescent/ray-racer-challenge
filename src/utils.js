
function floatingPointEquals(a, b, precision) {
    if (!precision) {return Math.abs(a-b) <= Number.EPSILON}
    else {
        return Math.abs(a-b) <= Math.pow(10, (precision+1)*-1)*5
    }
}

module.exports = { floatingPointEquals }