// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here
//GET "/movies/create" => renderizer el formulario para añadir nuevas peliculas
router.get("/create", async (req, res, next) => {
  try {
    const celebritiesList = await Celebrity.find().select("name");

    res.render("movies/new-movie.hbs", {
      celebritiesList,
    });
  } catch (err) {
    next(err);
  }
});

//POST "/movies/create" => guardar la información del formulario y redirigir
router.post("/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

//GET "/movies" => renderiza una página con la lsita de películas
router.get("/", async (req, res, next) => {
  try {
    const moviesList = await Movie.find().select("title");
    res.render("movies/movies.hbs", {
      moviesList,
    });
  } catch (err) {
    next(err);
  }
});

//GET "/movies/:id" => renderiza una página con los detalles de una película
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details.hbs", {
      movieDetails,
    });
  } catch (err) {
    next(err);
  }
});

//POST "/movies/:id/delete" => elimina una película de la DB y redire
router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

//GET "/movies/:id/edit" => renderiza un formulario para introducir cambios en una película
router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try { const movieDetails = await Movie.findById(id)
        const celebritiesList = await Celebrity.find()
        
    res.render("movies/edit-movie.hbs", {
      movieDetails,
      celebritiesList
    });
  } catch (err) {
    next(err);
  }
});


//POST "/movies/:id/edit" => recibe los datos del formulario, actualiza los datos y redirecciona
router.post("/:id/edit", async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDetails = req.body
        await Movie.findByIdAndUpdate(id, movieDetails ) 
        await Movie.findById(id)
        res.render("movies/movie-details.hbs", {
            movieDetails
        })

    } catch (err) {
    next(err);
  }


})


module.exports = router;
