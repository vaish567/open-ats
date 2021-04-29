"use strict";
/**
 * @description Adds two numbers together
 * @param a Any number
 * @param b Any number
 * @returns Returns the sum of `a` + `b`
 */
var sum = function (a, b) {
    if (isNaN(a) || isNaN(b)) {
        return "a & b must be numbers";
    }
    return a + b;
};
module.exports = sum;
