const {translation, rotation, shear} = require('transformations.test.js')
const { Tuple } = require('tuple.js')
const { Matrix } = require('matrix.js')

test('translation', () => {
    const transform = translation([1,2,3])
    const v = new Tuple([4,5,6])

    

    expect(transform.multiply(m2).equals(result)).toBe(true)
})

