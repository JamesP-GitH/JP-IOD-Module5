const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const productRoutes = require("./routes/productsRoutes");
app.use("/api/products", productRoutes);

module.exports = app;
