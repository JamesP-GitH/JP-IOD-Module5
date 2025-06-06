const express = require("express");
const router = express.Router();
const controller = require("../controllers/calculatorController");

router.get("/add", controller.addNumbers);

router.get("/subtract", controller.subtactNumbers);

router.get("/multiply", controller.multiplyNumbers);

router.get("/divide", controller.divideNumbers);

module.exports = router;
