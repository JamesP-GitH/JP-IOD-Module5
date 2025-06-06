const getRandom = (req, res) => {
    let max = parseFloat(req.query.max);
    let min = req.query.min !== undefined ? parseFloat(req.query.min) : 0;

    if (isNaN(min) || isNaN(max)) {
        res.status(400).json({ error: "Invalid input. Please provide valid numbers for min and max." });
        return;
    }

    if (min > max) {
        res.status(400).json({ error: "Min cannot be greater than max." });
        return;
    }

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(`Random number between ${min} and ${max}: ${randomNumber}`);
    res.status(200).json({ result: randomNumber });
};

module.exports = {
    getRandom,
};
