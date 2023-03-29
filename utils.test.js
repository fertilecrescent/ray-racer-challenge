const { floatingPointEquals } = require('./src/utils.js')

test('floattingPointEquals()', () => {
    expect(floatingPointEquals(.1+.2, .3)).toBe(true)
})