const Logger = require("./Logger");

class Calculator {
    constructor() {
        this.id = this.#generateId();
        this.logger = new Logger(`Calculator:${this.id}`);
    }

    #generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    add(num1, num2) {
        const value = num1 + num2;
        this.logger.log(`add(${num1}, ${num2}) = ${value}`);
        return value;
    }

    subtract(num1, num2) {
        const value = num1 - num2;
        this.logger.log(`subtract(${num1}, ${num2}) = ${value}`);
        return value;
    }

    multiply(num1, num2) {
        const value = num1 * num2;
        this.logger.log(`multiply(${num1}, ${num2}) = ${value}`);
        return value;
    }

    divide(num1, num2) {
        const value = num1 / num2;
        this.logger.log(`divide(${num1}, ${num2}) = ${value}`);
        return value;
    }
}

module.exports = Calculator;
