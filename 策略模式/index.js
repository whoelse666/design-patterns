const strategies = {
  add: function (num1, num2) {
    return num1 + num2;
  },
  subtract: function (num1, num2) {
    return num1 - num2;
  },
  multiply: function (num1, num2) {
    return num1 * num2;
  },
  divide: function (num1, num2) {
    return num1 / num2;
  }
};

const Calculator = function (strategy) {
  this.calculate = function (num1, num2) {
    return strategy(num1, num2);
  };
};

const addCalculator = new Calculator(strategies.add);
const subtractCalculator = new Calculator(strategies.subtract);
const multiplyCalculator = new Calculator(strategies.multiply);
const divideCalculator = new Calculator(strategies.divide);

console.log(addCalculator.calculate(10, 5));
console.log(subtractCalculator.calculate(10, 5));
console.log(multiplyCalculator.calculate(10, 5));
console.log(divideCalculator.calculate(10, 5));
