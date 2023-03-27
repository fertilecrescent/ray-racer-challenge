
class Tuple {

    constructor(first, second, third, fourth=0) {
        this.first = first
        this.second = second
        this.third = third
        this.fourth = fourth
    }

    equals(other) {
        return (
            Tuple.componentEquals(this.first, other.first) &&
            Tuple.componentEquals(this.second, other.second) &&
            Tuple.componentEquals(this.third, other.third) &&
            Tuple.componentEquals(this.fourth, other.fourth)
        )
    }

    static componentEquals(a, b) {
        return Math.abs(a-b) <= Number.EPSILON
    }

    add(other) {
        return new Tuple(
            this.first + other.first,
            this.second + other.second,
            this.third + other.third,
            this.fourth + other.fourth
        )
    }

    subtract(other) {
        return new Tuple(
            this.first - other.first,
            this.second - other.second,
            this.third - other.third,
            this.fourth - other.fourth
        )
    }

    negate() {
        return (new Tuple(0, 0, 0, 0)).subtract(this)
    }

    scale(factor) {
        return new Tuple(
            this.first * factor,
            this.second * factor,
            this.third * factor,
            this.fourth * factor
        )
    }

    magnitude() {
        const sumOfSquares = this.first*this.first + this.second*this.second + 
            this.third*this.third + this.fourth*this.fourth
        return Math.pow(sumOfSquares, 1/2)
    }

    normalize() {
        return new Tuple(
            this.first / this.magnitude(),
            this.second / this.magnitude(),
            this.third / this.magnitude(),
            this.fourth / this.magnitude()
        )
    }

    dot(other) {
        return this.first * other.first + this.second * other.second +
            this.third * other.third + this.fourth * other.fourth
    }

    cross(other) {
        return new Tuple(
            this.second * other.third - this.third * other.second,
            this.third * other.first - this.first * other.third,
            this.first * other.second - this.second * other.third
        )
    }

    hadamard(other) {
        return new Tuple(
            this.first * other.first,
            this.second * other.second,
            this.third * other.third,
            this.fourth * other.fourth
        )
    }

    isPoint() {
        return this.fourth === 1
    }

    isVector() {
        return this.fourth === 0
    }
}

function point(first, second, third) {
    return new Tuple(first, second, third, 1)
}

function vector(first, second, third) {
    return new Tuple(first, second, third, 0)
}

function color(first, second, third) {
    return new Tuple(first, second, third, 0)
}

module.exports = {Tuple, point, vector, color}