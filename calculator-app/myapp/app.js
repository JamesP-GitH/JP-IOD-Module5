const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const calculatorRoutes = require("./routes/calculatorRoutes");
const extraRoutes = require("./routes/extraRoutes");

app.use("/calculator", calculatorRoutes);
app.use("/extra", extraRoutes);

module.exports = app;
