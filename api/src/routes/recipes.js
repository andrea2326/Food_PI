const { Router } = require('express');
const express = require("express");
const { Recipe, TypeDiet } = require('../db');
const { getAllRecipes } = require ('../controllers/getRecipies.js');
const router = Router();


router.get('/', async (req, res) =>{                   
    const { name } = req.query;                                  // Pido el name por query
    if(name){  
        try{ 
            let recipes = await getAllRecipes();
            let filtered = await recipes.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
            console.log(filtered)
            res.status(200).send(filtered);
        }catch(err){
            res.status(404).send('Sorry! No recipes found');
        };
    }else{
        const allRecipes = await getAllRecipes();
        res.status(200).send(allRecipes);
    };
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();
    let validate = id.includes("-");
  
    if (validate) {
      try {
        let dbId = await Recipe.findByPk(id, { include: DietType });
        res.status(200).json([dbId]);
      } catch (err) {
        console.log(err);
      };
    } else {
      try {
        if (id) {
          let recipeId = await allRecipes.filter((el) => el.id === parseInt(id));
          recipeId.length
            ? res.status(200).send(recipeId)
            : res.status(400).send('Sorry! This recipe does not exist');
        };
      } catch (err) {
        res.json({ message: err });
      };
    };
  });
  


module.exports = router;
