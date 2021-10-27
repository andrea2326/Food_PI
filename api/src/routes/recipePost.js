const express = require('express');
const axios = require ('axios');
const { Recipe, TypeDiet } = require('../db');

const router = express.Router();


router.post('/recipe', async (req, res) => {
    let {
        name,                   // Titulo
        summary,                // Resumen del plato
        spoonacularScore,       // Puntuación
        healthScore,            // Nivel de "comida saludable"
        analyzedInstructions,   // Paso a paso
        createInDb,
        typeDiet
    } = req.body;
    if(!name || !summary){
        return res.status(404).send('Please, try again entering title and summary')
    }
    try{
        let recipeCreated = await Recipe.create ({
            name,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            createInDb,
        });

        let typeDietDb = await TypeDiet.findAll({
            where: { name: typeDiet }
        });

        recipeCreated.addTypeDiet(typeDietDb)
        res.send('Your recipe was created successfully!')
    }catch(err){
        next(err);
    };
});



module.exports = router;
