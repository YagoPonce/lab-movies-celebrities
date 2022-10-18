// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")

// all your routes here

//GET "/celebrities/create" => renderiza un formulario para crear nueva celebridad
router.get("/create", (req, res, next) => {
        res.render("celebrities/new-celebrity.hbs")
       
})

//POST "celebrities/create" => añadir la información recibida en la DB
router.post("/create", async (req, res, next) => {
        try {
            const { name, occupation, catchPhrase } = req.body
           await Celebrity.create({
                name,
                occupation,
                catchPhrase
            })
            
            res.redirect("/celebrities")


        } catch (err) {
        next(err)
        }
})


//GET "/celebrities" => renderiza pagina con lista de celebridades
router.get("/", async (req, res, next) => {
    try{
        const celebritiesList = await Celebrity.find()
        .select("name")
        res.render("celebrities/celebrities.hbs", {
            celebritiesList
        })


    }catch (err) {
        next(err)
        }
})



module.exports = router;