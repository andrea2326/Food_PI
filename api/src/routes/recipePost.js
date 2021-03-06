const express = require('express');
const axios = require ('axios');
const { Recipe, TypeDiet } = require('../db');

const router = express.Router();


router.post('/', async (req, res) => {
    let {
        title,                  // Titulo
        summary,                // Resumen del plato
        spoonacularScore,       // Puntuación
        healthScore,            // Nivel de "comida saludable"
        analyzedInstructions,   // Paso a paso
        createInDb,
        typeDiet
    } = req.body;
    if(!title || !summary){
        return res.status(404).send('Please, try again entering title and summary')
    }
    try{
        let recipeCreated = await Recipe.create ({
            title,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            createInDb,
        });

        let typeDietDb = await TypeDiet.findAll({
            where: { name: typeDiet }
        });

        await recipeCreated.addTypeDiet(typeDietDb)
        res.send(recipeCreated)
    }catch(err){
        next(err);
    };
});



module.exports = router;
