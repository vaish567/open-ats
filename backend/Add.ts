/**
 * @description Adds two numbers together
 * @param a Any number
 * @param b Any number
 * @returns Returns the sum of `a` + `b`
 */
const sum = (a: number, b: number): number | string => {
  if (isNaN(a) || isNaN(b)) {
    return "a & b must be numbers";
  }

  return a + b;
};

export = sum;
