/**
 * @jest-environment jsdom
 */

const { Pixels } = require('./src/pixels.js')
const { Tuple } = require('./src/tuple.js')

document.body.innerHTML = ' \
<div id="canvas-container"> \
<canvas width="400" height="300" id="canvas"></canvas> \
</div> \
'

const ctx = document.getElementById('canvas').getContext('2d')

test('Pixels basic', () => {
    const pixels = new Pixels(ctx)

    const [r, g, b, a] = pixels.getIndices(0, 1)
    expect(r).toBe(400*4)
    expect(g).toBe(400*4+1)
    expect(b).toBe(400*4+2)
    expect(a).toBe(400*4+3)

    const cyan = new Tuple([-10, 260, 37,0]) // will be clamped
    pixels.write(cyan, 0, 1)
    
    const shouldBeCyan = pixels.read(0, 1)
    expect(shouldBeCyan.get(0)).toBe(0)
    expect(shouldBeCyan.get(1)).toBe(255)
    expect(shouldBeCyan.get(2)).toBe(37)
    // the actual alpha value will be 255, but we set the fourth component of the tuple to 
    // 0 for the sake of calculations
    expect(shouldBeCyan.get(3)).toBe(0)

    expect(pixels.data[r]).toBe(0)
    expect(pixels.data[g]).toBe(255)
    expect(pixels.data[b]).toBe(37)
    expect(pixels.data[a]).toBe(255)
})