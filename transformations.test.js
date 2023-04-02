const {
    Tuple,
    Matrix,
    translation, 
    rotationX, 
    rotationY, 
    rotationZ, 
    scaling, 
    shearing
} = require('./src/matrix.js')

test('translation matrix', () => {

    const transform = translation(1,2,3)
    expect(transform.width).toBe(4)
    expect(transform.height).toBe(4)
    expect(transform.get(0,3)).toBe(1)
    expect(transform.get(1,3)).toBe(2)
    expect(transform.get(2,3)).toBe(3)
    expect(transform.get(3,3)).toBe(1)
})

test('basic translation', () => {

    const transform = translation(1,2,3)
    const p = Tuple.point(4,5,6)
    const result = transform.multiply(p)
    const answer = Tuple.point(5,7,9)
    expect(result.equals(answer)).toBe(true)
})

test('translation does nothing to vector', () => {

    const transform = translation(1,2,3)
    const v = Tuple.vector(4,5,6)
    const result = transform.multiply(v)
    const answer = Tuple.vector(4,5,6)
    expect(result.equals(answer)).toBe(true)
})

test('inverse undoes a translation', () => {
    
    const transform = translation(1,2,3)
    const p = Tuple.point(4,5,6)
    const result = transform.multiply(p)
    expect(result.equals(p)).not.toBe(true)

    const inverseTransform = transform.inverse()
    const shouldBeOriginal = inverseTransform.multiply(result)
    expect(p.equals(shouldBeOriginal)).toBe(true)
})

test('scaling matrix', () => {

    const transform = scaling(1,2,3)
    expect(transform.width).toBe(4)
    expect(transform.height).toBe(4)
    expect(transform.get(0,0)).toBe(1)
    expect(transform.get(1,1)).toBe(2)
    expect(transform.get(2,2)).toBe(3)
    expect(transform.get(3,3)).toBe(1)
})

test('basic scaling', () => {

    const transform = scaling(1,2,3)
    const p = Tuple.point(4,5,6)
    const result = transform.multiply(p)
    const answer = Tuple.point(4,10,18)
    expect(result.equals(answer)).toBe(true)
})

test('inverse undoes scaling', () => {
    
    const transform = scaling(1,2,3)
    const p = Tuple.point(4,5,6)
    const result = transform.multiply(p)
    expect(result.equals(p)).not.toBe(true)

    const inverseTransform = transform.inverse()
    const shouldBeOriginal = inverseTransform.multiply(result)
    expect(p.equals(shouldBeOriginal)).toBe(true)
})

test('rotationX matrix', () => {
    const angle = Math.PI/4
    const transform = rotationX(angle)
    const answer = new Matrix([
        [1,0,0,0],
        [0,Math.cos(angle),Math.sin(angle)*-1,0],
        [0,Math.sin(angle),Math.cos(angle),0],
        [0,0,0,1]
    ])

    expect(transform.equals(answer)).toBe(true)
})

test('rotationX basic', () => {
    const unitY = Tuple.point(0,1,0)
    const halfQuarter = rotationX(Math.PI/4)
    const fullQuarter = rotationX(Math.PI/2)

    const halfQuarterResult = halfQuarter.multiply(unitY)
    const halfQuarterAnswer = Tuple.point(0, Math.sqrt(2)/2, Math.sqrt(2)/2)
    expect(halfQuarterResult.equals(halfQuarterAnswer)).toBe(true)

    const fullQuarterResult = fullQuarter.multiply(unitY)
    const fullQuarterAnswer = Tuple.point(0, 0, 1)
    expect(fullQuarterResult.equals(fullQuarterAnswer)).toBe(true)
})

test('inverse undoes rotationX', () => {
    const unitY = Tuple.point(0,1,0)

    const halfQuarter = rotationX(Math.PI/4)
    const halfQuarterInverse = halfQuarter.inverse()

    const halfQuarterResult = halfQuarter.multiply(unitY)
    const halfQuarterUndone = halfQuarterInverse.multiply(halfQuarterResult)
    expect(halfQuarterUndone.equals(unitY)).toBe(true)
})

test('rotationY matrix', () => {
    const angle = Math.PI/4
    const transform = rotationY(angle)
    const answer = new Matrix([
        [Math.cos(angle),0,Math.sin(angle),0],
        [0,1,0,0],
        [-1*Math.sin(angle),0,Math.cos(angle),0],
        [0,0,0,1]
    ])
    expect(transform.equals(answer)).toBe(true)
})

test('rotationY basic', () => {
    const unitX = Tuple.point(1,0,0)
    const halfQuarter = rotationY(Math.PI/4)
    const fullQuarter = rotationY(Math.PI/2)

    const halfQuarterResult = halfQuarter.multiply(unitX)
    const halfQuarterAnswer = Tuple.point(Math.sqrt(2)/2, 0, -Math.sqrt(2)/2)
    expect(halfQuarterResult.equals(halfQuarterAnswer)).toBe(true)

    const fullQuarterResult = fullQuarter.multiply(unitX)
    const fullQuarterAnswer = Tuple.point(0, 0, -1)
    expect(fullQuarterResult.equals(fullQuarterAnswer)).toBe(true)
})

test('inverse undoes rotationY', () => {
    const unitX = Tuple.point(1,0,0)

    const halfQuarter = rotationY(Math.PI/4)
    const halfQuarterInverse = halfQuarter.inverse()

    const halfQuarterResult = halfQuarter.multiply(unitX)
    const halfQuarterUndone = halfQuarterInverse.multiply(halfQuarterResult)
    expect(halfQuarterUndone.equals(unitX)).toBe(true)
})

test('rotationZ matrix', () => {
    const angle = Math.PI/4
    const transform = rotationZ(angle)
    const answer = new Matrix([
        [Math.cos(angle),-Math.sin(angle),0,0],
        [Math.sin(angle),Math.cos(angle),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ])

    expect(transform.equals(answer)).toBe(true)
})

test('rotationZ basic', () => {
    const unitY = Tuple.point(0,1,0)
    const halfQuarter = rotationZ(Math.PI/4)
    const fullQuarter = rotationZ(Math.PI/2)

    const halfQuarterResult = halfQuarter.multiply(unitY)
    const halfQuarterAnswer = Tuple.point(-Math.sqrt(2)/2, 1*Math.sqrt(2)/2, 0)
    expect(halfQuarterResult.equals(halfQuarterAnswer)).toBe(true)

    const fullQuarterResult = fullQuarter.multiply(unitY)
    const fullQuarterAnswer = Tuple.point(-1, 0, 0)
    expect(fullQuarterResult.equals(fullQuarterAnswer)).toBe(true)
})

test('inverse undoes rotationZ', () => {
    const unitY = Tuple.point(0,1,0)

    const halfQuarter = rotationZ(Math.PI/4)
    const halfQuarterInverse = halfQuarter.inverse()

    const halfQuarterResult = halfQuarter.multiply(unitY)
    const halfQuarterUndone = halfQuarterInverse.multiply(halfQuarterResult)
    expect(halfQuarterUndone.equals(unitY)).toBe(true)
})

test('shearing matrix', () => {
    const transform = shearing(1,2,3,4,5,6)
    const answer = new Matrix([
        [1,1,2,0],
        [3,1,4,0],
        [5,6,1,0],
        [0,0,0,1]
    ])
    expect(transform.equals(answer)).toBe(true)
})

test('shearing basic', () => {
    const p = Tuple.point(1,2,3)
    const transform = shearing(1,2,3,4,5,6)
    const result = transform.multiply(p)
    const answer = Tuple.point(1+1*2+2*3, 2+3*1+4*3, 3+1*5+2*6)
    expect(result.equals(answer)).toBe(true)
})

test('inverse undoes shearing', () => {
    const p = Tuple.point(1,2,3)
    const transform = shearing(1,2,3,4,5,6)
    const inverse = transform.inverse()
    const result = transform.multiply(p)
    expect(inverse.multiply(result).equals(p, 8)).toBe(true)
})