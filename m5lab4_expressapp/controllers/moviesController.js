const movies = require("../models/movies");

const getAllMovies = (req, res) => {
    res.json(movies);
};

const getMovieById = (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((movieItr) => movieItr.id === movieId);

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
};

const addMovie = (req, res) => {
    const { title, genre } = req.body;
    if (index === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    if (!title || !genre) {
        return res.status(400).json({ error: "Movie must have a title and genre" });
    }

    if (title && typeof title !== "string") {
        return res.status(400).json({ error: "Title must be a string." });
    }

    if (genre && typeof genre !== "string") {
        return res.status(400).json({ error: "Genre must be a string." });
    }

    const newMovie = {
        id: movies.length + 1,
        title,
        genre,
    };

    movies.push(newMovie);
    res.status(200).json(newMovie);
};

const updateMovie = (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, genre } = req.body;

    const index = movies.findIndex((movie) => movie.id === movieId);

    if (title && typeof title !== "string") {
        return res.status(400).json({ error: "Title must be a string." });
    }

    if (genre && typeof genre !== "string") {
        return res.status(400).json({ error: "Genre must be a string." });
    }

    if (index !== -1) {
        movies[index] = { ...movies[index], ...req.body, id: movieId };
    } else {
        return res.status(404).json({ error: "Movie ID not found" });
    }
};

const deleteMovie = (req, res) => {
    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {
        return res.status(400).json({ error: "Invalid ID, ID must be a number." });
    }

    const index = movies.findIndex((movie) => movie.id === movieId);

    if (index !== -1) {
        const deletedMovie = movies.splice(index, 1)[0];
        res.json({ result: `Deleted movie with ID ${movieId}`, data: deletedMovie });
    } else {
        res.status(404).json({ error: `Movie not found with ID ${movieId}` });
    }
};

const filterMovies = (req, res) => {
    const { letter } = req.query;

    if (!letter || typeof letter !== "string" || letter.length !== 1 || !/^[a-z]$/i.test(letter)) {
        return res.status(400).json({ error: "Invalid or missing 'letter'. Must be a single alphabet character." });
    }
    const matchingMovies = movies.filter((movie) => movie.title && movie.title[0].toLowerCase() === letter.toLowerCase());

    console.log(matchingMovies);

    if (matchingMovies.length > 0) {
        return res.json(matchingMovies);
    } else {
        res.status(404).json({ error: `No movies found starting with letter '${letter}'` });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    filterMovies,
};
