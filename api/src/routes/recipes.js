const { Router } = require('express');
const express = require("express");
const { Recipe, TypeDiet } = require('../db');
const { getAllRecipes, getMoreRecipes } = require ('../controllers/getRecipies.js');
const router = Router();

router.get('/', getMoreRecipes)

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();
    let validate = id.includes("-");
  
    if (validate) {
      try {
        let dbId = await Recipe.findByPk(id, { include: TypeDiet });
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
