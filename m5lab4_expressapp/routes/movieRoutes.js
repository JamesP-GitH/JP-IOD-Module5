const express = require("express");
const router = express.Router();
let controllerMovies = require("../controllers/moviesController");

router.get("/filter", controllerMovies.filterMovies);

router.get("/:id", controllerMovies.getMovieById);

router.put("/:id", controllerMovies.updateMovie);

router.delete("/:id", controllerMovies.deleteMovie);

router.post("/", controllerMovies.addMovie);

router.get("/", controllerMovies.getAllMovies);

module.exports = router;
