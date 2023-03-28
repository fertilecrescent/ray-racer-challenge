const { Tuple } = require('./tuple.js')
const { floatingPointEquals } = require('./utils.js')

class Matrix {

    constructor(height, width) {
        this.validateHeightWidth(height, width)
        this.height = height
        this.width = width
        this.data = this.zeroes()
    }

    zeroes() {
        const data = []
        for (let row=0; row<this.height; row++) {
            data.push([])
            for (let col=0; col<this.width; col++) {
                data[row].push(0)
            }
        }
        return data
    }

    get(row, col) {
        return this.data[row][col]
    }

    set(row, col, val) {
        this.data[row][col] = val
    }

    equals(other) {
        if (!(other instanceof Matrix)) {return false}
        else if (this.width !== other.width) {return false}
        else if (this.height !== other.height) {return false}
        else {
            for (let row=0; row<this.height; row++) {
                for (let col=0; col<this.width; col++) {
                    if (!floatingPointEquals(this.get(row, col), other.get(row, col))) {
                        return false
                    }
                }
            }
            return true
        }
    }

    multiply(other) {
        if (!this.height === 4) {
            throw Error("matrix multiplications require a 4x4 matrix")
        }
        if (other instanceof Tuple) {return this._multiplyTuple(other)}
        else {

        }
    }

    _multiplyTuple(tuple) {
        if (!this.height === 4) {
            throw Error("matrix multiplications require a 4x4 matrix")
        }
        
    }

    multiplyTuple()

    validateHeightWidth(height, width) {
        if (height < 2 || height > 4) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        } else if (width < 2 || width > 4) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        } else if (height !== width) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        }
    }
}

module.exports = { Matrix }