const {
    Tuple,
    translation, 
    rotationX, 
    rotationY, 
    rotationZ, 
    scaling, 
    shearing
} = require('./src/matrix.js')

test('constructor', () => {

    const tup = new Tuple([1,2,3,4])
    // initally set to all zeroes
    expect(tup.data[1]).toBe(2)
})

test('get, set', () => {
    const tup = new Tuple([0, 0])
    expect(tup.get(0)).toBe(0)
    expect(tup.get(1)).toBe(0)
    expect(() => {tup.get(2)}).toThrow('2 is out of bounds for tuple of size 2')

    tup.set(0, 999)
    expect(tup.get(0)).toBe(999)
    expect(() => tup.set(2, 1000)).toThrow('2 is out of bounds for tuple of size 2')
})

test('equals', () => {
    const tupA = new Tuple([5,6,7,8])
    const tupB = new Tuple([5,6,7,8])
    expect(tupA.equals(tupB)).toBe(true)
    expect(tupB.equals(tupA)).toBe(true)

    tupA.set(0, 999)
    expect(tupA.equals(tupB)).toBe(false)
    expect(tupB.equals(tupA)).toBe(false)

    // different size
    const tupC = new Tuple([5,6,7])
    expect(tupA.equals(tupC)).toBe(false)
    expect(tupC.equals(tupA)).toBe(false)
})

test('add', () => {
    const tupA = new Tuple([2,2,2,2])
    const tupB = new Tuple([5,6,7,8])
    const tupC = tupA.add(tupB)
    // basic
    expect(tupC.data).toEqual([7,8,9,10])
    // wrong data type
    expect(() => {tupA.add([9,10,11,12])}).toThrow('only tuples can be added to tuples')
    // different sizes
    const tupD = new Tuple([1,2,3])
    expect(() => {tupA.add(tupD)}).toThrow('cannot add tuples of different sizes')
})

test('subtract', () => {
    const tupA = new Tuple([2,2,2,2])
    const tupB = new Tuple([5,6,7,8])
    const tupC = tupA.subtract(tupB)
    // basic
    expect(tupC.data).toEqual([-3,-4,-5,-6])
    // wrong data type
    expect(() => {tupA.subtract([9,10,11,12])}).toThrow('only tuples can be subtracted from tuples')
    // different sizes
    const tupD = new Tuple([1,2,3])
    expect(() => {tupA.subtract(tupD)}).toThrow('cannot subtract tuples of different sizes')
})

test('negate', () => {
    const tupA = new Tuple([1,2,3,4])
    const tupB = new Tuple([-1,-2,-3,-4])

    expect(tupA.negate().equals(tupB)).toBe(true)
    expect(tupB.negate().equals(tupA)).toBe(true)
})

test('scaleEven', () => {
    const tupA = new Tuple([1,2,3,4])
    const tupB = tupA.scaleEven(5)

    expect(tupB.data).toEqual([5,10,15,20])
})

test('magnitude', () => {
    expect((new Tuple([2,2,2,2])).magnitude()).toBe(4)
})

test('normalize', () => {
    const tupA = new Tuple([2,2,2,2])
    const tupB = tupA.normalize()

    expect(tupB.get(0)).toBe(.5)
    expect(tupB.get(1)).toBe(.5)
    expect(tupB.get(2)).toBe(.5)
    expect(tupB.get(3)).toBe(.5)
    expect(tupB.magnitude()).toBe(1)

    const tupC = (new Tuple([99, 3, 167, 14])).normalize()
    expect(tupC.magnitude()).toBe(1)
})

test('multiply', () => {
    const tupA = new Tuple([1,2,3,0])
    const tupB = new Tuple([3,2,1,0])
    expect(tupA.multiply(tupB)).toBe(10)
    const tupC = new Tuple([1,1,-1,0])
    expect(tupA.multiply(tupC)).toBe(0)
})

test('cross', () => {
    const tupA = new Tuple([1,0,0,0])
    const tupB = new Tuple([0,1,0,0])
    expect(tupA.cross(tupB).equals(new Tuple([0, 0, 1,0]))).toBe(true)

    const tupC = new Tuple([1,2,3,0])
    const tupD = new Tuple([4,6,7,0])
    expect(tupC.cross(tupD).equals(new Tuple([-4, -5, -2])))
})

test('hadamard', () => {
    const tupA = new Tuple([3,6,9,12])
    const tupB = new Tuple([8,6,4,2])
    const tupC = tupA.hadamard(tupB)
    expect(tupC.get(0)).toBe(24)
    expect(tupC.get(1)).toBe(36)
    expect(tupC.get(2)).toBe(36)
    expect(tupC.get(3)).toBe(24)
})

test('translate', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.translate(4,5,6)

    const transform = translation(4,5,6)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)

    // can only transform points and vectors
    expect(() => new Tuple([1,2,3,4,5]).translate(4,5,6)).toThrow('can only transform points and vectors')
})

test('scale', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.scale(4,5,6)

    const transform = scaling(4,5,6)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)
})

test('rotateX', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.rotateX(4)

    const transform = rotationX(4)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)
})

test('rotateY', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.rotateY(4)

    const transform = rotationY(4)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)
})

test('rotateZ', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.rotateZ(4)

    const transform = rotationZ(4)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)
})

test('shear', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.shear(4,5,6,7,8,9)

    const transform = shearing(4,5,6,7,8,9)
    const answer = transform.multiply(tup)

    expect(result.equals(answer)).toBe(true)
})

test('chain', () => {
    const tup = new Tuple([1,2,3,1])

    const result = tup.shear(4,5,6,7,8,9).rotateZ(10).scale(-11,12,13)

    const transform = scaling(-11,12,13).multiply(rotationZ(10)).multiply(shearing(4,5,6,7,8,9))
    const answer = transform.multiply(tup)

    expect(result.equals(answer, 8)).toBe(true)
})
