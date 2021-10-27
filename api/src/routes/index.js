const { Router } = require('express');
const recipesRoute = require('./recipes');
const typeRoute = require('./typeDiet');
const postRecipeRoute = require('./recipePost');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/recipes', recipesRoute);
router.use('/type', typeRoute);
router.use('/recipe', postRecipeRoute)

module.exports = router;
