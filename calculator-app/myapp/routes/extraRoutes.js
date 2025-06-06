const express = require("express");
const router = express.Router();
const controller = require("../controllers/extrasController");

router.get("/random", controller.getRandom);

module.exports = router;
