const { Router } = require('express');
const recipesRoute = require('./recipes.js');
const typeRoute = require('./typeDiet.js');
const postRecipeRoute = require('./recipePost.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/recipes', recipesRoute);
router.use('/type', typeRoute);
router.use('/recipe', postRecipeRoute)

module.exports = router;
