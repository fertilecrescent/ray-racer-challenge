const { Tuple } = require('./tuple.js')
const { Pixels } = require('./pixels.js')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const pixels = new Pixels(ctx)

for (let x=0; x<pixels.width; x++) {
    for (let y=0; y<20; y++)
        pixels.write(new Tuple(255, 0, 255, 1), x, y)
}
pixels.draw()