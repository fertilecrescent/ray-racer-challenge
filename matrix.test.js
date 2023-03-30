const { Tuple } = require('./src/tuple.js')
const { Matrix } = require('./src/matrix.js')

test('constructor', () => {

    // construct without data
    // too small
    expect(() => {new Matrix(null,1,1)}).toThrow('dims must be 2x2 or 3x3 or 4x4')
    // too big
    expect(() => {new Matrix(null,5,5)}).toThrow('dims must be 2x2 or 3x3 or 4x4')
    // unequal dims
    expect(() => {new Matrix(null,2,3)}).toThrow('dims must be 2x2 or 3x3 or 4x4')

    // construct with data
    const tooSmall = [[1], [2]]
    const tooBig = [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
    const unequalDims = [[1,2,3], [1,2,3]]
    const unevenRows = [[1,2,3], [1,2], [1,2,3]]
    expect(() => {new Matrix(tooSmall)}).toThrow('dims must be 2x2 or 3x3 or 4x4')
    expect(() => {new Matrix(tooBig)}).toThrow('dims must be 2x2 or 3x3 or 4x4')
    expect(() => {new Matrix(unequalDims)}).toThrow('dims must be 2x2 or 3x3 or 4x4')
    expect(() => {new Matrix(unevenRows)}).toThrow('dims must be 2x2 or 3x3 or 4x4')

    expect((new Matrix(null, 2, 2)).height).toBe(2)
    expect((new Matrix(null, 2, 2)).width).toBe(2)

    const validDims = [[1,2,3], [1,2,3], [1,2,3]]
    expect((new Matrix(validDims)).width).toBe(3)
    expect((new Matrix(validDims)).height).toBe(3)
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

test('rows', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    expect(m.rows()).toEqual([[1,2,3],[4,5,6],[7,8,9]])
})

test('cols', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    expect(m.cols()).toEqual([[1,4,7], [2,5,8], [3,6,9]])
})

test('setRow', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    m.setRow(2, [11,12,13])
    expect(m.getRow(2)).toEqual([11,12,13])
})

test('setCol', () => {
    let m = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
    m.setCol(0, [4,7,10])
    expect(m.getCol(0)).toEqual([4,7,10])
})

test('equals', () => {
    const m1 = new Matrix(null, 4,4)
    // size difference
    expect ((m1.equals(new Matrix(null, 3,3)))).toBe(false)

    const m2 = new Matrix(null, 4,4)
    expect(m1.equals(m2)).toBe(true)
    expect(m2.equals(m1)).toBe(true)

    m1.set(0,0,1); m2.set(0,0,1); 
    m1.set(1,1,2); m2.set(1,1,2);
    m1.set(2,2,3); m2.set(2,2,3);
    m1.set(3,3,4); m2.set(3,3,4);

    expect(m1.equals(m2)).toBe(true)

    m1.set(0,0,2)
    expect(m1.equals(m2)).toBe(false)
    expect(m2.equals(m1)).toBe(false)
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
})

// test('_removeCol', () => {
//     const m1 = new Matrix(
//         [[1,2,3,4],
//         [5,6,7,8],
//         [9,10,11,12],
//         [13,14,15,16]]
//     )

//     expect(() => m1._removeCol(4)).toThrow('Cannot remove column at index 4. Out of bounds for matrix of width 4.')

//     const m2 = m1._removeCol(3)
//     expect(m2.equals(new Matrix(
//         [[1,2,3],
//         [4,5,6],
//         [7,8,9]]
//     ))).toBe(true)

//     expect(m2.width).toBe(2)
//     expect(m2.height.toBe(3))
// })

// test('_removeRow', () => {
//     const m1 = new Matrix(
//         [[1,2,3,4],
//         [5,6,7,8],
//         [9,10,11,12],
//         [13,14,15,16]]
//     )

//     expect(() => m1._removeRow(4)).toThrow('Cannot remove row at index 4. Out of bounds for matrix of height 4.')

//     const m2 = m1._removeRow(3)
//     expect(m2.equals(new Matrix(
//         [[1,2,3,4],
//         [5,6,7,8],
//         [9,10,11,12]]
//     ))).toBe(true)

//     expect(m2.width).toBe(3)
//     expect(m2.height).toBe(2)
// })

// test('submatrix', () => {
//     const m1 = new Matrix(
//         [[1,2,3,4],
//         [5,6,7,8],
//         [9,10,11,12],
//         [13,14,15,16]]
//     )

//     expect(() => m1.submatrix(4, 2)).toThrow('Cannot remove row at index 4. Out of bounds for matrix of height 4.')
//     expect(() => m1.submatrix(1, 5)).toThrow('Cannot remove column at index 5. Out of bounds for matrix of width 4.')

//     const m2 = m1.submatrix(3, 2)
//     expect(m2.equals(new Matrix(
//         [[1,2,4],
//         [5,6,8],
//         [9,10,12]]
//     ))).toBe(true)

//     expect(m2.width).toBe(3)
//     expect(m2.height).toBe(3)

//     const m3 = m2.submatrix(0, 0)
//     expect(m3.equals(new Matrix([
//         [6,8],
//         [10,12]]
//     ))).toBe(true)

//     expect(() => m3.submatrix(0, 0)).toThrow('cannot create a submatrix from a 2x2 matrix')
// })

// test('minor', () => {
//     const m1 = new Matrix(
//         [[1,2,3],
//         [4,5,6],
//         [7,8,9]]
//     )
//     const m1_minor = m1.minor(0,1)
//     expect(m1_minor).toBe(4*9 - 6*7)

//     const m2 = new Matrix(
//         [[1,2,3,4],
//         [5,6,7,8],
//         [9,10,11,12]]
//     )

//     expect(() => m2.minor()).toThrow('can only take the minor of 3x3 matrices')
// })

// test('hasInverse', () => {
//     const m1 = new Matrix(
//         [[6,4,4,4],
//         [5,5,7,6],
//         [4,-9,3,-7],
//         [9,1,7,-6]]
//     )
//     expect(m1.det()).toBe(-2120)
//     expect(m1.hasInverse()).toBe(true)

//     const m2 = new Matrix(
//         [[-4,2,-2,-3],
//         [9,6,2,6],
//         [0,-5,1,-5],
//         [0,0,0,0]]
//     )
    
//     expect(m2.det()).toBe(0)
//     expect(m2.hasInverse()).toBe(false)
// })

// test('inverse', () => {

//     const m1 = new Matrix(
//         [[-5,2,6,-8],
//         [1,-5,1,8],
//         [7,7,-6,-7],
//         [1,-3,7,4]]
//     )

//     const m1_inverse = m1.inverse()

//     const det = m1.det()
//     expect(det).toBe(532)

//     expect(m1.cofactor(2,3)).toBe(-160)
//     expect(m1_inverse.get(2,3)).toBe(-160/532)
    
//     expect(m1.cofactor(3,2)).toBe(105)
//     expect(m1_inverse.get(3,2)).toBe(105/532)
    
//     const data = []
//     let cof
//     for (let row=0; row<4; row++) {
//         data.push([])
//         for (let col=0; col<4; col++) {
//             let cof = m1.cofactor(col, row)
//             data[row].push(cof/det)
//         }
//     }

//     expect(new Matrix(data).equals(m1_inverse)).toBe(true)

//     const m2 = new Matrix(
//         [[8,-5,9,2],
//         [7,5,6,1],
//         [-6,0,9,6],
//         [-3,0,-9,-4]]
//     )

//     const m2_inverse = m2.inverse()
//     expect(m2_inverse.equals(new Matrix(
//         [[-0.15385, -0.15385, -0.28205, -0.53846],
//         [-0.07692, 0.12308, 0.02564, 0.03077],
//         [0.35897, 0.35897, 0.43590, 0.92308],
//         [-0.69231, -0.69231, -0.76923, -1.92308]]
//     ),5)).toBe(true)

//     // does inversion work?
//     const m3 = m1.multiply(m2)
//     expect(m3.multiply(m2_inverse)).toBe(m1)
// })