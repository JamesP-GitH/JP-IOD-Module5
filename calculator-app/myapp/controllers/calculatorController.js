const Calculator = require("../libraries/Calculator");
let myCalc = new Calculator();

const addNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = myCalc.add(number1, number2);
    res.status(200);
    res.json({ result: sum });
};

const subtactNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let difference = myCalc.subtract(number1, number2);
    console.log(difference);
    res.status(200);
    res.json({ result: difference });
};

const multiplyNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let product = myCalc.multiply(number1, number2);
    console.log(product);
    res.status(200);
    res.json({ result: product });
};

const divideNumbers = (req, res) => {
    let number1 = parseFloat(req.query.num1);
    let number2 = parseFloat(req.query.num2);

    if (number2 === 0) {
        res.status(400).json({ error: "Division by zero is not allowed." });
        return;
    }
    let result = myCalc.divide(number1, number2);
    console.log(result);
    res.status(200).json({ result: result });
};

module.exports = {
    addNumbers,
    subtactNumbers,
    multiplyNumbers,
    divideNumbers,
};
