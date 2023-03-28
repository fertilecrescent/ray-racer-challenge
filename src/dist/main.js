/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Tuple } = __webpack_require__(/*! ./tuple.js */ \"./src/tuple.js\")\nconst { Pixels } = __webpack_require__(/*! ./pixels.js */ \"./src/pixels.js\")\n\nconst canvas = document.getElementById('canvas')\nconst ctx = canvas.getContext('2d')\n\nconst pixels = new Pixels(ctx)\n\nfor (let x=0; x<pixels.width; x++) {\n    for (let y=0; y<20; y++)\n        pixels.write(new Tuple(255, 0, 255, 1), x, y)\n}\npixels.draw()\n\n//# sourceURL=webpack://ray-racer-challenge/./src/main.js?");

/***/ }),

/***/ "./src/pixels.js":
/*!***********************!*\
  !*** ./src/pixels.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Tuple } = __webpack_require__(/*! ./tuple.js */ \"./src/tuple.js\")\n\nclass Pixels {\n\n    constructor(ctx) {\n        this.ctx = ctx\n        this.width = ctx.canvas.width\n        this.height = ctx.canvas.height\n        this.imageData = ctx.getImageData(0, 0, this.width, this.height)\n        this.data = this.imageData.data\n    }\n\n    getIndices(x, y) {\n        const red = y*this.width*4 + x*4\n        return [red, red+1, red+2, red+3]\n    }\n\n    write(color, x, y) {\n        const [r, g, b, a] = this.getIndices(x,y)\n        color = this.clampColor(color)\n\n        this.data[r] = color.first\n        this.data[g] = color.second\n        this.data[b] = color.third\n        this.data[a] = 255\n    }\n\n    draw() {\n        console.log(this.imageData, 'image data')\n        this.ctx.putImageData(this.imageData, 0, 0)\n    }\n\n    clampColor(color) {\n        color.first = this.clampComponent(color.first)\n        color.second = this.clampComponent(color.second)\n        color.third = this.clampComponent(color.third)\n        return color\n    }\n\n    clampComponent(component) {\n        if (component > 255) {\n            return 255\n        } else if (component < 0) {\n            return 0\n        } else {\n            return component\n        }\n    }\n\n    read(x, y) {\n        const [r, g, b, a] = this.getIndices(x,y)\n        return new Tuple(\n            this.data[r],\n            this.data[g],\n            this.data[b],\n            0\n        )\n    }\n\n    readComponent(x, y, component) {\n        return this.data[this.getIndices(x, y)][component]\n    }\n}\n\nmodule.exports = { Pixels }\n\n//# sourceURL=webpack://ray-racer-challenge/./src/pixels.js?");

/***/ }),

/***/ "./src/tuple.js":
/*!**********************!*\
  !*** ./src/tuple.js ***!
  \**********************/
/***/ ((module) => {

eval("\n\n\nclass Tuple {\n\n    constructor(first, second, third, fourth=0) {\n        this.first = first\n        this.second = second\n        this.third = third\n        this.fourth = fourth\n    }\n\n    equals(other) {\n        return (\n            Tuple.componentEquals(this.first, other.first) &&\n            Tuple.componentEquals(this.second, other.second) &&\n            Tuple.componentEquals(this.third, other.third) &&\n            Tuple.componentEquals(this.fourth, other.fourth)\n        )\n    }\n\n    static componentEquals(a, b) {\n        return Math.abs(a-b) <= Number.EPSILON\n    }\n\n    add(other) {\n        return new Tuple(\n            this.first + other.first,\n            this.second + other.second,\n            this.third + other.third,\n            this.fourth + other.fourth\n        )\n    }\n\n    subtract(other) {\n        return new Tuple(\n            this.first - other.first,\n            this.second - other.second,\n            this.third - other.third,\n            this.fourth - other.fourth\n        )\n    }\n\n    negate() {\n        return (new Tuple(0, 0, 0, 0)).subtract(this)\n    }\n\n    scale(factor) {\n        return new Tuple(\n            this.first * factor,\n            this.second * factor,\n            this.third * factor,\n            this.fourth * factor\n        )\n    }\n\n    magnitude() {\n        const sumOfSquares = this.first*this.first + this.second*this.second + \n            this.third*this.third + this.fourth*this.fourth\n        return Math.pow(sumOfSquares, 1/2)\n    }\n\n    normalize() {\n        return new Tuple(\n            this.first / this.magnitude(),\n            this.second / this.magnitude(),\n            this.third / this.magnitude(),\n            this.fourth / this.magnitude()\n        )\n    }\n\n    dot(other) {\n        return this.first * other.first + this.second * other.second +\n            this.third * other.third + this.fourth * other.fourth\n    }\n\n    cross(other) {\n        return new Tuple(\n            this.second * other.third - this.third * other.second,\n            this.third * other.first - this.first * other.third,\n            this.first * other.second - this.second * other.third\n        )\n    }\n\n    hadamard(other) {\n        return new Tuple(\n            this.first * other.first,\n            this.second * other.second,\n            this.third * other.third,\n            this.fourth * other.fourth\n        )\n    }\n\n    isPoint() {\n        return this.fourth === 1\n    }\n\n    isVector() {\n        return this.fourth === 0\n    }\n}\n\nfunction point(first, second, third) {\n    return new Tuple(first, second, third, 1)\n}\n\nfunction vector(first, second, third) {\n    return new Tuple(first, second, third, 0)\n}\n\nfunction color(first, second, third) {\n    return new Tuple(first, second, third, 0)\n}\n\nmodule.exports = {Tuple, point, vector, color}\n\n//# sourceURL=webpack://ray-racer-challenge/./src/tuple.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;