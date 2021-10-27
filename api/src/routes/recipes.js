const { Router } = require('express');
const axios = require ('axios');
const { Recipe, TypeDiet } = require('../db');
const { getAllRecipes, allRecipes } = require ('../controllers/getRecipies')
const router = Router();


router.get('/recipes', allRecipes)

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await getAllRecipes();

    let validate = id.includes('*');
    if(validate){
        try {
            let IdDB = await Recipe.findByPK(id, {include: TypeDiet});
            res.status(200).json([IdDB]);
        }catch(err){
            console.log(err);
        };
    }else{
        try{
            if(id){
                let recipesId = await recipesTotal.filter(el => el.id === parseInt(id));
                recipesId.length ?
                res.sendStatus(200).json(recipesId) :
                res.send('Recipe not found');
            };
        }catch(err){
            res.json({message: err})
        };
    };
});


module.exports = router;
