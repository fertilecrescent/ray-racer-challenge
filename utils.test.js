const { floatingPointEquals } = require('./src/utils.js')

test('floattingPointEquals()', () => {
    expect(floatingPointEquals(.1+.2, .3)).toBe(true)
    // e = .00004
    expect(floatingPointEquals(.123454, .12345, 5)).toBe(true)
    // Math.abs
    expect(floatingPointEquals(.12345, .123454, 5)).toBe(true)
    // e = .000049
    expect(floatingPointEquals(.1234547, .1234596, 5)).toBe(true)
    // e = .000051
    expect(floatingPointEquals(.1234547, .1234598, 5)).toBe(false)
})