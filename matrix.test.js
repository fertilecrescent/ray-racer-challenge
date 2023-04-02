const {
    Tuple,
    Matrix
} = require('./src/matrix.js')
const { floatingPointEquals } = require('./src/utils.js')

test('constructor', () => {

    const emptyData1 = []
    const emptyData2 = [[],[],[]]

    expect(() => new Matrix(emptyData1)).toThrow('matrix cannot be empty')
    expect(() => new Matrix(emptyData2)).toThrow('matrix cannot be empty')

    const unevenRows = [[1,2,3], [1,2], [1,2,3]]
    expect(() => {new Matrix(unevenRows)}).toThrow('all rows must be of equal length')

    // would have no rows
    expect(() => new Matrix(null, 0, 1)).toThrow('matrix cannot be empty')
    // would have no columns
    expect(() => new Matrix(null, 1, 0)).toThrow('matrix cannot be empty')

    // rows aren't arrays
    const data = [[1,2,3], 5, [5,6,7]]
    expect(() => new Matrix(data)).toThrow('rows must be inputted as arrays')
    // if you forget to wrap your input data
    expect(() => new Matrix([1,2,3],[4,5,6],[7,8,9])).toThrow('rows must be inputted as arrays')

    const zeros = new Matrix(null, 2, 3)
    
    expect(zeros.height).toBe(2)
    expect(zeros.width).toBe(3)
    expect(zeros.get(0,0)).toBe(0)
    expect(zeros.get(1,1)).toBe(0)
    expect(zeros.get(1, 2)).toBe(0)

    const m1 = new Matrix([
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [10,11,12]
    ])

    expect(m1.width).toBe(3)
    expect(m1.height).toBe(4)
    expect(m1.get(0,0)).toBe(1)
    expect(m1.get(1,1)).toBe(5)
    expect(m1.get(2,2)).toBe(9)
    expect(m1.get(3,2)).toBe(12)
})

test('get, set', () => {
    let m = new Matrix(null, 4, 4)
    expect(m.data[0][0]).toBe(0)
    expect(m.data[3][3]).toBe(0)

    m.set(1,1,10)
    expect(m.get(1,1)).toBe(10)
    expect(m.data[1][1]).toBe(10)
})

test('getRow', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    expect(m.getRow(0)).toEqual([1,2,3])
})

test('getCol', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    expect(m.getCol(0)).toEqual([1,4,7])
})

test('equals', () => {
    const m1 = new Matrix(null, 4,4)
    // size difference
    expect ((m1.equals(new Matrix(null, 3,3)))).toBe(false)

    // floating point approximation
    const m2 = new Matrix(
        [[.1+.2, 1, 2],
        [.2+.4, 3, 4]]
    )
    
    const m3 = new Matrix(
        [[.3, 1, 2],
        [.6, 3, 5]]
    )

    expect(m2.equals(m3)).toBe(false)

    // precision

    const m4 = new Matrix([
        [.1231987, .4563987]
    ])

    const m5 = new Matrix([
        [.123, .456]
    ])

    expect(m4.equals(m5)).toBe(false)
    expect(m4.equals(m5, 3)).toBe(true)
})

test('multiply', () => {
    const m1 = new Matrix([[1,2], 
                            [3,4]])
    const m2 = new Matrix([[5,6], 
                            [7,8]])
    const m3 = m1.multiply(m2)
    expect(m3.get(0, 0)).toBe(19)
    expect(m3.get(0, 1)).toBe(22)
    expect(m3.get(1, 0)).toBe(43)
    expect(m3.get(1, 1)).toBe(50)

    const m4 = new Matrix([[1,2,3,4],
                            [5,6,7,8],
                            [9,10,11,12],
                            [13,14,15,16]])

    const m5 = new Matrix([[1,0,0,0],
                            [0,1,0,0],
                            [0,0,1,0],
                            [0,0,0,1]])
    
    expect(m4.multiply(m5).equals(m4)).toBe(true)

    const m6 = new Matrix([
        [1,2],
        [3,4],
        [5,6]
    ])

    const m7 = new Matrix([
        [1],
        [1]
    ])

    const m8 = new Matrix([
        [3],
        [7],
        [11]
    ])

    m6.multiply(m7)
    expect(m6.multiply(m7).equals(m8)).toBe(true)

    const m9 = new Matrix([
        [1, 1],
        [1, 1]
    ])

    const m10 = new Matrix([
        [3, 3],
        [7, 7],
        [11, 11]
    ])

    expect(m6.multiply(m9).equals(m10)).toBe(true)

    // test invalid dimensions for multiplication
    const m11 = new Matrix([
        [1, 1],
        [1, 1],
        [1, 1]
    ])

    // for reference
    // const m6 = new Matrix([
    //     [1,2],
    //     [3,4],
    //     [5,6]
    // ])
    
    expect(() => m6.multiply(m11)).toThrow('A.width must equal B.height')

    // test multiply by tuple
    const m12 = new Matrix([
        [2,2,2],
        [3,3,3],
        [4,4,4]
    ])

    const tup1 = new Tuple([2,3,4])
    const tup2 = m12.multiply(tup1)

    expect(tup2.data).toEqual([18,27,36])

    // wrong dims
    const tup3 = new Tuple([2,3,4,5])

    expect(() => m12.multiply(tup3)).toThrow('A.width must equal B.height')
})

test('transpose', () => {
    const m1 = new Matrix([[1,2], 
                            [3,4]])
    const m1_transpose = m1.transpose()
    const m2 = new Matrix([[1,3],[2,4]])
    expect(m1_transpose.equals(m2)).toBe(true)

    const m3 = new Matrix([[1,2,3,4],
                            [5,6,7,8],
                            [9,10,11,12],
                            [13,14,15,16]])

    const m3_transpose = m3.transpose()
    const m4 = new Matrix([[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]])

    expect(m3_transpose.equals(m4)).toBe(true)

    const m5 = new Matrix([
        [1,2,3],
        [4,5,6]
    ])

    const m6 = new Matrix([
        [1,4],
        [2,5],
        [3,6]
    ])

    expect(m5.transpose().equals(m6)).toBe(true)
})

test('removeRow', () => {
    const m = new Matrix(
        [[1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16]]
    )

    expect(() => m.removeRow(4)).toThrow('Row index 4 is out of bounds for matrix of height 4.')

    const result = m.removeRow(3)

    expect(result.equals(new Matrix(
        [[1,2,3,4],
        [5,6,7,8],
        [9,10,11,12]]
    ))).toBe(true)

    expect(result.width).toBe(m.width)
    expect(result.height).toBe(m.height-1)
})

test('removeCol', () => {
    const m = new Matrix(
        [[1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16]]
    )

    expect(() => m.removeCol(4)).toThrow('Column index 4 is out of bounds for matrix of width 4.')

    const result = m.removeCol(3)
    expect(result.equals(new Matrix(
        [[1,2,3],
        [5,6,7],
        [9,10,11],
        [13,14,15]]
    ))).toBe(true)

    expect(result.width).toBe(m.width-1)
    expect(result.height).toBe(m.height)
})

test('submatrix', () => {
    const m1 = new Matrix(
        [[1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16]]
    )

    expect(() => m1.submatrix(4, 2)).toThrow('Row index 4 is out of bounds for matrix of height 4.')
    expect(() => m1.submatrix(1, 5)).toThrow('Column index 5 is out of bounds for matrix of width 4.')

    const m2 = m1.submatrix(3, 2)
    expect(m2.equals(new Matrix(
        [[1,2,4],
        [5,6,8],
        [9,10,12]]
    ))).toBe(true)

    expect(m2.width).toBe(3)
    expect(m2.height).toBe(3)

    const m3 = m2.submatrix(0, 0)
    expect(m3.equals(new Matrix([
        [6,8],
        [10,12]]
    ))).toBe(true)
})

test('det', () => {

    // 2x2
    const m2D = new Matrix([
        [1,2],
        [3,4]
    ])

    expect(m2D.det()).toBe(-2)

    // 3x3
    const m3D = new Matrix([
        [12,-32,3],
        [4,96,11],
        [-7,-47,2]
    ])

    expect(m3D.det()).toBe(12680)

    // 4x4
    const m4D = new Matrix([
        [11,32,14,-6],
        [4,8,-13,-14],
        [17,36,-100,4],
        [12,-89,42,47]
    ])

    expect(m4D.det()).toBe(2464714)
})

test('minor', () => {
    // 3x3
    const m3D = new Matrix(
        [[1,2,3],
        [4,5,6],
        [7,8,9]]
    )
    const m1_minor = m3D.minor(0,1)
    expect(m1_minor).toBe(4*9 - 6*7)

    // 4x4
    const m4D = new Matrix([
        [1,2,3,10],
        [4,5,6,11],
        [7,8,9,12],
        [13,14,15,16]
    ])

    expect(m4D.minor(0,0)).toEqual(
        m4D.submatrix(0,0).det()
    )

    expect(floatingPointEquals(m4D.minor(3,2), m4D.submatrix(3,2).det()*-1)).toBe(true)
})

test('cofactor', () => {

    const m3D = new Matrix([
        [1,2,3],
        [4,5,6],
        [5,6,7]
    ])

    expect(m3D.cofactor(0,0)).toBe(m3D.minor(0,0))
    expect(m3D.cofactor(0,1)).toBe(m3D.minor(0,1)*-1)
    expect(m3D.cofactor(2,1)).toBe(m3D.minor(2,1)*-1)
})

test('hasInverse', () => {


    const m1 = new Matrix(
        [[6,4,4,4],
        [5,5,7,6],
        [4,-9,3,-7],
        [9,1,7,-6]]
    )
    expect(m1.det()).toBe(-2120)
    expect(m1.hasInverse()).toBe(true)

    const m2 = new Matrix(
        [[-4,2,-2,-3],
        [9,6,2,6],
        [0,-5,1,-5],
        [0,0,0,0]]
    )
    
    expect(m2.det()).toBe(0)
    expect(m2.hasInverse()).toBe(false)
})

test('inverse', () => {

    const noInverse = new Matrix(
        [[-4,2,-2,-3],
        [9,6,2,6],
        [0,-5,1,-5],
        [0,0,0,0]]
    )

    expect(noInverse.inverse()).toBe(null)

    const m1 = new Matrix(
        [[-5,2,6,-8],
        [1,-5,1,8],
        [7,7,-6,-7],
        [1,-3,7,4]]
    )

    const det = m1.det()
    expect(det).toBe(532)

    const m1_inverse = m1.inverse()

    expect(m1.cofactor(2,3)).toBe(-160)
    expect(m1_inverse.get(3,2)).toBe(-160/532)
    
    expect(m1.cofactor(3,2)).toBe(105)
    expect(m1_inverse.get(2,3)).toBe(105/532)
    

    const m2 = new Matrix(
        [[8,-5,9,2],
        [7,5,6,1],
        [-6,0,9,6],
        [-3,0,-9,-4]]
    )

    const m2_inverse = m2.inverse()
    expect(m2_inverse.equals(new Matrix(
        [[-0.15385, -0.15385, -0.28205, -0.53846],
        [-0.07692, 0.12308, 0.02564, 0.03077],
        [0.35897, 0.35897, 0.43590, 0.92308],
        [-0.69231, -0.69231, -0.76923, -1.92308]]
    ),5)).toBe(true)

    // does inversion work?
    const m3 = m1.multiply(m2)
    expect(m3.multiply(m2_inverse).equals(m1, 8)).toBe(true)
})

test('multiplyTuple', () => {
    const tup = new Tuple([1,2,3])
    const m = new Matrix([
        [1,2,1],
        [2,1,3],
        [1,4,0]
    ])

    const result = m.multiply(tup)
    expect(result.data).toEqual([8,13,9])
})