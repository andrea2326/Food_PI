const { Router } = require('express');
const axios = require ('axios');
const { Recipe, TypeDiet } = require('../db');
const { getAllRecipes } = require ('../controllers/getRecipies')
const router = Router();


router.get('/', async (req, res) =>{                   
    const { name } = req.query;                                  // Pido el name por query
    let recipes = await getAllRecipes();
    if(name){     
        let filtered = await recipes.filter((el) => 
        el.createInDb
        ? el.name.toLowerCase().includes(name.toLocaleLowerCase())
        : el.title.toLowerCase().includes(name.toLowerCase())
        );
        filtered.length
        ? res.status(200).send(filtered)
        :res.status(404).send('Sorry! This recipe does not exist')
    }else{
        res.send(recipes);
    };
});




router.get('/:id', async (req, res) => {
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
