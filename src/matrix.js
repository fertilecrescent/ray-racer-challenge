const { Tuple } = require('./tuple.js')
const { floatingPointEquals } = require('./utils.js')

class Matrix {

    constructor(data, height, width) {
        if (data) {
            this.validateData(data)
            this.data = data
            this.height = this.data.length
            this.width = this.data[0].length
        } else {
            this.validateHeightWidth(height, width)
            this.height = height
            this.width = width
            this.data = this.zeroes()
        }
    }

    zeroes() {
        const data = []
        for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
            data.push([])
            for (let colIndex=0; colIndex<this.width; colIndex++) {
                data[rowIndex].push(0)
            }
        }
        return data
    }

    get(rowIndex, colIndex) {
        return this.data[rowIndex][colIndex]
    }

    rows() {
        return this.data
    }

    cols() {
        const cols = []
        for (let colIndex=0; colIndex<this.width; colIndex++) {
            cols.push(this.getCol(colIndex))
        }
        return cols
    }

    set(rowIndex, colIndex, val) {
        this.data[rowIndex][colIndex] = val
    }

    getRow(rowIndex) {
        return this.data[rowIndex]
    }

    getRowAsTuple(rowIndex) {
        return new Tuple(this.getRow(rowIndex))
    }

    setRow(rowIndex, row) {
        this.data[rowIndex] = row
    }

    getCol(colIndex) {
        const col = []
        for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
            col.push(this.get(rowIndex, colIndex))
        }
        return col
    }

    getColAsTuple(colIndex) {
        return new Tuple(this.getCol(colIndex))
    }

    setCol(colIndex, col) {
        for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
            this.set(rowIndex, colIndex, col[rowIndex])
        }
    }

    equals(other) {
        if (!(other instanceof Matrix)) {return false}
        else if (this.width !== other.width) {return false}
        else if (this.height !== other.height) {return false}
        else {
            for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
                for (let colIndex=0; colIndex<this.width; colIndex++) {
                    if (!floatingPointEquals(this.get(rowIndex, colIndex), other.get(rowIndex, colIndex))) {
                        return false
                    }
                }
            }
            return true
        }
    }

    dot(other) {
        const data = []
        let thisRow
        let otherCol
        for (let i=0; i<this.height; i++) {
            data.push([])
            for (let j=0; j<other.width; j++) {
                thisRow = this.getRowAsTuple(i)
                otherCol = other.getColAsTuple(j)
                data[i].push(thisRow.dot(otherCol))
            }
        }
        return new Matrix(data)
    }

    transpose() {
        const data = this.zeroes()
        for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
            for (let colIndex=0; colIndex<this.width; colIndex++) {
                data[rowIndex][colIndex] = this.get(colIndex, rowIndex)
            }
        }
        return new Matrix(data)
    }

    validateData(data) {
        const height = data.length
        if (height < 2 || height > 4) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        }
        const width = data[0].length
        if (!(height == width)) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        }
        if (width < 2 || width > 4) {
            throw Error('dims must be 2x2 or 3x3 or 4x4')
        }
        for (let rowIndex=1; rowIndex<height; rowIndex++) {
            if (data[rowIndex].length != width) {
                throw Error('dims must be 2x2 or 3x3 or 4x4')
            }
        }
    }

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