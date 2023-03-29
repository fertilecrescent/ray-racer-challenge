const { Tuple } = require('./tuple.js')

class Pixels {

    constructor(ctx) {
        this.ctx = ctx
        this.width = ctx.canvas.width
        this.height = ctx.canvas.height
        this.imageData = ctx.getImageData(0, 0, this.width, this.height)
        this.data = this.imageData.data
    }

    getIndices(x, y) {
        const red = y*this.width*4 + x*4
        return [red, red+1, red+2, red+3]
    }

    write(color, x, y) {
        const [r, g, b, a] = this.getIndices(x,y)
        color = this.clampColor(color)

        this.data[r] = color.get(0)
        this.data[g] = color.get(1)
        this.data[b] = color.get(2)
        this.data[a] = 255
    }

    draw() {
        this.ctx.putImageData(this.imageData, 0, 0)
    }

    clampColor(color) {
        color.set(0, this.clampComponent(color.get(0)))
        color.set(1, this.clampComponent(color.get(1)))
        color.set(2, this.clampComponent(color.get(2)))
        return color
    }

    clampComponent(component) {
        if (component > 255) {
            return 255
        } else if (component < 0) {
            return 0
        } else {
            return component
        }
    }

    read(x, y) {
        const [r, g, b] = this.getIndices(x,y)
        return new Tuple([
            this.data[r],
            this.data[g],
            this.data[b],
            0
        ])
    }

    readComponent(x, y, component) {
        return this.data[this.getIndices(x, y)][component]
    }
}

module.exports = { Pixels }