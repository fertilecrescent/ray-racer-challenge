const { floatingPointEquals } = require('./utils.js')

class Tuple {

    constructor(data) {
        this.data = data
        this.size = data.length
    }

    get(index) {
        if (index >= this.size) {
            throw Error(`${index} is out of bounds for tuple of size ${this.size}`)
        }
        return this.data[index]
    }

    set(index, value) {
        if (index >= this.size) {
            throw Error(`${index} is out of bounds for tuple of size ${this.size}`)
        }
        this.data[index] = value
    }

    equals(other) {
        if (!(other instanceof Tuple)) {return false}
        else if (!(this.size === other.size)) {return false}
        else {
            return this.data.reduce((acc, _, index) => {
                return acc && 
                floatingPointEquals(this.get(index), other.get(index))
            }, true)
        }
    }

    add(other) {
        if (!(other instanceof Tuple)) {
            throw Error('only tuples can be added to tuples')
        } else if (!(this.size === other.size)) {
            throw Error('cannot add tuples of different sizes')
        } else {
            return new Tuple(this.data.map((_, index) => this.get(index) + other.get(index)))
        }
    }

    subtract(other) {
        if (!(other instanceof Tuple)) {
            throw Error('only tuples can be subtracted from tuples')
        } else if (!(this.size === other.size)) {
            throw Error('cannot subtract tuples of different sizes')
        } else {
            return new Tuple(this.data.map((_, index) => this.get(index) - other.get(index)))
        }
    }

    negate() {
        const zeros = []
        for (let i=0; i<this.size; i++) {zeros.push(0)}
        return (new Tuple(zeros)).subtract(this)
    }

    scale(factor) {
        return new Tuple(this.data.map((val) => val*factor))
    }

    magnitude() {
        const squares = this.data.map((val) => val*val)
        const sumOfSquares = squares.reduce((acc, val) => {return acc + val}, 0)
        return Math.pow(sumOfSquares, 1/2)
    }

    normalize() {
        return new Tuple(this.data.map((val) => val/this.magnitude()))
    }

    dot(other) {
        return this.data.reduce((acc, _, index) => {
            return acc + this.get(index)*other.get(index)
        }, 0)
    }

    cross(other) {
        if (!(other instanceof Tuple)) {throw Error('cannot cross a vector with a non-vector')}
        else if (!(this.size === 4 && other.size === 4)) {
            throw Error('to cross two vectors they must each be of size 4')
        } else {
            return new Tuple([
                this.get(1) * other.get(2) - this.get(2) * other.get(1),
                this.get(2) * other.get(0) - this.get(0) * other.get(2),
                this.get(0) * other.get(1) - this.get(1) * other.get(0),
                0
            ])
        }
    }

    hadamard(other) {
        return new Tuple(this.data.map((_, index) => 
            this.get(index)*other.get(index)
        ))
    }
}

module.exports = { Tuple }