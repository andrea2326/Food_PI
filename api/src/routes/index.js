const { Router } = require('express');
const recipesRoute = require('./recipes');
const typeRoute = require('./typeDiet');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/recipes', recipesRoute);
router.use('/typeDiet', typeRoute);

module.exports = router;
