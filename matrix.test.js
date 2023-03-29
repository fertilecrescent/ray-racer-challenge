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

test('dot', () => {
    const m1 = new Matrix([[1,2], 
                            [3,4]])
    const m2 = new Matrix([[5,6], 
                            [7,8]])
    const m3 = m1.dot(m2)
    expect(m3.get(0, 0)).toBe(19)
    expect(m3.get(0, 1)).toBe(22)
    expect(m3.get(1, 0)).toBe(43)
    expect(m3.get(1, 1)).toBe(50)
})