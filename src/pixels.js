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

        this.data[r] = color.first
        this.data[g] = color.second
        this.data[b] = color.third
        this.data[a] = 255
    }

    draw() {
        console.log(this.imageData, 'image data')
        this.ctx.putImageData(this.imageData, 0, 0)
    }

    clampColor(color) {
        color.first = this.clampComponent(color.first)
        color.second = this.clampComponent(color.second)
        color.third = this.clampComponent(color.third)
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
        const [r, g, b, a] = this.getIndices(x,y)
        return new Tuple(
            this.data[r],
            this.data[g],
            this.data[b],
            0
        )
    }

    readComponent(x, y, component) {
        return this.data[this.getIndices(x, y)][component]
    }
}

module.exports = { Pixels }