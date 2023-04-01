const { Matrix } = require('./matrix.js')

function translation(x, y, z) {
    return new Matrix([
        [1,0,0,x],
        [0,1,0,y],
        [0,0,1,z],
        [0,0,0,1]
    ])
}

function scaling(x, y, z) {
    return new Matrix([
        [x,0,0,0],
        [0,y,0,0],
        [0,0,z,0],
        [0,0,0,1]
    ])
}

function rotationX(rad) {
    return new Matrix([
        [1,0,0,0],
        [0,Math.cos(rad),Math.sin(rad)*-1,0],
        [0,Math.sin(rad),Math.cos(rad),0],
        [0,0,0,1]
    ])
}

function rotationY(rad) {
    return new Matrix([
        [Math.cos(rad),0,Math.sin(rad),0],
        [0,1,0,0],
        [-1*Math.sin(rad),0,Math.cos(rad),0],
        [0,0,0,1]
    ])
}

function rotationZ(rad) {
    return new Matrix([
        [Math.cos(rad),-1*Math.sin(rad),0,0],
        [Maht.sin(rad),Math.cos(rad),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ])
}

function shearing(xy, xz, yx, yz, zx, zy) {
    return new Matrix([
        [1,xy,xz,0],
        [yx,1,yz,0],
        [zx,zy,1,0],
        [0,0,0,1]
    ])
}

module.exports = {translation, rotationX, rotationY, rotationZ, scaling, shearing}