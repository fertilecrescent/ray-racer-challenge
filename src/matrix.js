const { floatingPointEquals } = require('./utils.js')

function translation(x, y, z) {
    return new Matrix([
        [1,0,0,x],
        [0,1,0,y],
        [0,0,1,z],
        [0,0,0,1]
    ])
}

function scaling(x, y, z) {
    return new Matrix([
        [x,0,0,0],
        [0,y,0,0],
        [0,0,z,0],
        [0,0,0,1]
    ])
}

function rotationX(rad) {
    return new Matrix([
        [1,0,0,0],
        [0,Math.cos(rad),Math.sin(rad)*-1,0],
        [0,Math.sin(rad),Math.cos(rad),0],
        [0,0,0,1]
    ])
}

function rotationY(rad) {
    return new Matrix([
        [Math.cos(rad),0,Math.sin(rad),0],
        [0,1,0,0],
        [-1*Math.sin(rad),0,Math.cos(rad),0],
        [0,0,0,1]
    ])
}

function rotationZ(rad) {
    return new Matrix([
        [Math.cos(rad),-1*Math.sin(rad),0,0],
        [Math.sin(rad),Math.cos(rad),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ])
}

function shearing(xy, xz, yx, yz, zx, zy) {
    return new Matrix([
        [1,xy,xz,0],
        [yx,1,yz,0],
        [zx,zy,1,0],
        [0,0,0,1]
    ])
}

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

    equals(other, precision) {
        if (!(other instanceof Tuple)) {return false}
        else if (!(this.size === other.size)) {return false}
        else {
            return this.data.reduce((acc, _, index) => {
                return acc && 
                floatingPointEquals(this.get(index), other.get(index), precision)
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

    scaleEven(factor) {
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

    multiply(other) {
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

    translate(x, y, z) {
        this.validateCanTransform()
        const transform = translation(x,y,z)
        return transform.multiply(this)
    }

    scale(x, y, z) {
        this.validateCanTransform()
        const transform = scaling(x,y,z)
        return transform.multiply(this)
    }

    rotateX(angle) {
        this.validateCanTransform()
        const transform = rotationX(angle)
        return transform.multiply(this)
    }

    rotateY(angle) {
        this.validateCanTransform()
        const transform = rotationY(angle)
        return transform.multiply(this)
    }

    rotateZ(angle) {
        this.validateCanTransform()
        const transform = rotationZ(angle)
        return transform.multiply(this)
    }

    shear(xy, xz, yx, yz, zx, zy) {
        this.validateCanTransform()
        const transform = shearing(xy, xz, yx, yz, zx, zy)
        return transform.multiply(this)
    }

    isVector() {
        return (this.size == 4) && (this.data[3] == 0)
    }

    isPoint() {
        return (this.size == 4) && (this.data[3] == 1)
    }

    validateCanTransform() {
        if (!(this.size == 4)) {
            throw new Error('can only transform points and vectors')
        }
    }

    static point(x, y, z) {
        return new Tuple([x,y,z,1])
    }

    static vector(x, y, z) {
        return new Tuple([x,y,z,0])
    }
}

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
            this.data = this.zeros()
        }
    }

    zeros() {
        return this.map(() => 0)
    }

    get(row, col) {
        this.validateIndices(row, col)
        return this.data[row][col]
    }

    set(row, col, val) {
        this.validateIndices(row, col)
        this.data[row][col] = val
    }

    getRow(row) {
        this.validateRowIndex(row)
        return this.data[row]
    }

    getRowAsTuple(row) {
        this.validateRowIndex(row)
        return new Tuple(this.getRow(row))
    }

    getCol(colIndex) {
        this.validateColumnIndex(colIndex)
        const col = []
        for (let rowIndex=0; rowIndex<this.height; rowIndex++) {
            col.push(this.get(rowIndex, colIndex))
        }
        return col
    }

    getColAsTuple(colIndex) {
        this.validateColumnIndex(colIndex)
        return new Tuple(this.getCol(colIndex))
    }

    equals(other, precision) {
        if (!(other instanceof Matrix)) {return false}
        else if (this.width !== other.width) {return false}
        else if (this.height !== other.height) {return false}
        else {
            for (let row=0; row<this.height; row++) {
                for (let col=0; col<this.width; col++) {
                    if (!floatingPointEquals(this.get(row, col), other.get(row, col), precision)) {
                        return false
                    }
                }
            }
            return true
        }
    }

    multiplyTuple(tuple) {
        if (tuple.size !== this.width) {
            throw Error('A.width must equal B.height')
        }

        const data = []
        for (let row=0; row<this.height; row++) {
            data.push(this.getRowAsTuple(row).multiply(tuple))
        }
        return new Tuple(data)
    }

    multiply(other) {

        if (other instanceof Tuple) {
            return this.multiplyTuple(other)
        }

        if (this.width !== other.height) {
            throw Error('A.width must equal B.height')
        }

        const data = []
        let [a, b] = [null, null]
        for (let row=0; row<this.height; row++) {
            data.push([])
            for (let col=0; col<other.width; col++) {
                a = this.getRowAsTuple(row)
                b = other.getColAsTuple(col)
                data[row].push(a.multiply(b))
            }
        }

        return new Matrix(data)
    }

    transpose() {
        const data = []
        let rowData
        for (let col=0; col<this.width; col++) {
            rowData = []
            for (let row=0; row<this.height; row++) {
                rowData.push(this.get(row, col))
            }
            data.push(rowData)
        }
        return new Matrix(data)
    }

    det2() {
        if (this.width !== 2 || this.height !== 2) {
            throw Error('this function only works on 2x2 matrices')
        } else {
            return this.get(0,0)*this.get(1,1) - this.get(0,1)*this.get(1,0)
        }    
    }

    removeRow(rowToRemove) {
        this.validateRowIndex(rowToRemove)

        const data = this.map((args) => {
            const {row, col, rowToRemove} = args
            if (row != rowToRemove) {
                return this.get(row, col)
            }
        }, 
        {rowToRemove})
    
        return new Matrix(data)
    }

    removeCol(colToRemove) {
        this.validateColumnIndex(colToRemove)

        const data = this.map((args) => {
            const {row, col, colToRemove} = args
            if (col != colToRemove) {
                return this.get(row, col)
            }
        }, 
        {colToRemove})

        return new Matrix(data)
    }

    submatrix(row, col) {
        return this.removeRow(row).removeCol(col)
    }

    det2() {
        if (!(this.width == 2 && this.height == 2)) {
            throw Error('can only take the det2 of 2x2 matrices')
        } else {
            return this.get(0,0)*this.get(1,1) - this.get(0,1)*this.get(1,0)
        }
    }

    det() {
        if (!(this.height == this.width)) {
            throw Error('can only take the determinant of square matrices')
        } else if (this.height == 1) {
            throw Error('cannot take determinants of matrices smaller than 2x2')
        } else if (this.height == 2 && this.width == 2) {
            return this.det2()
        } else {
            const data = this.data[0].map((_, col) => {
                return this.cofactor(0, col) * this.get(0, col)
            })
            return data.reduce((acc, val) => {return acc + val}, 0)
        }
    }

    hasInverse() {
        return !floatingPointEquals(this.det(), 0) && (this.height == this.width)
    }

    inverse() {
        if (!this.hasInverse()) {return null}
        else {
            const det = this.det()
            const m = new Matrix(null, this.height, this.width)
            for (let row=0; row<this.height; row++) {
                for (let col=0; col<this.width; col++) {
                    const cofactor = this.cofactor(row, col)
                    m.set(col, row, cofactor/det)
                }
            }
            return m
        }
    }

    minor(row, col) {
        return this.submatrix(row, col).det()
    }

    cofactor(row, col) {
        let sign = 1
        if ((row+col)%2 == 1) {sign = -1}
        return this.submatrix(row, col).det() * sign
    }

    validateData(data) {
        const height = data.length
        if (height == 0) {throw Error('matrix cannot be empty')}

        const width = data[0].length
        if (width == 0) {throw Error('matrix cannot be empty')}

        for (let row=1; row<height; row++) {
            if (!Array.isArray(data[row])) {throw Error('rows must be inputted as arrays')}
            if (data[row].length != width) {
                throw Error('all rows must be of equal length')
            }
        }
    }

    map(func, args) {
        const data = []
        let rowData
        let val
        for (let row=0; row<this.height; row++) {
            rowData = []
            for (let col=0; col<this.width; col++) {
                if (args)
                    val = func(Object.assign(args, {row, col}))
                else
                    val = func({row, col})
                if (val != null) {
                    rowData.push(val)
                }
            }
            if (rowData.length > 0) 
                data.push(rowData)
        }
        return data
    }

    validateHeightWidth(height, width) {
        if (height == 0 || width == 0) {
            throw Error('matrix cannot be empty')
        }
    }

    validateRowIndex(rowIndex) {
        if (rowIndex < 0) {
            throw new Error('Row indices must be greater than 0')
        } else if (rowIndex >= this.height) {
            throw Error(`Row index ${rowIndex} is out of bounds for matrix of height ${this.height}.`)
        }
    }

    validateColumnIndex(colIndex) {
        if (colIndex < 0) {
            throw new Error('Column indices must be greater than 0')
        } else if (colIndex >= this.width) {
            throw Error(`Column index ${colIndex} is out of bounds for matrix of width ${this.width}.`)
        }
    }

    validateIndices(rowIndex, colIndex) {
        this.validateRowIndex(rowIndex)
        this.validateColumnIndex(colIndex)
    }
}

module.exports = { 
    Matrix,
    Tuple,
    translation, 
    rotationX, 
    rotationY, 
    rotationZ, 
    scaling, 
    shearing 
}