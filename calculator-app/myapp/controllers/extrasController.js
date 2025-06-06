const getRandom = (req, res) => {
    let max = parseFloat(req.query.max);
    let min = req.query.min !== undefined && req.query.min !== "" ? parseFloat(req.query.min) : 0;

    if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers for min and max." });
    }

    if (min > max) {
        return res.status(400).json({ error: "Min cannot be greater than max." });
    }

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(`Random number between ${min} and ${max}: ${randomNumber}`);
    return res.status(200).json({ result: randomNumber });
};

module.exports = {
    getRandom,
};
