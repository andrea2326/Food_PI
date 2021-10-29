const { Router } = require('express');
const{ TypeDiet } = require('../db');
const router = Router();
const { diets} = require('../controllers/getTypes.js')


router.get('/type', async (req, res) => {
    diets.forEach(el => {
        TypeDiet.findOrCreate({
            where: { name: el.name }
        });
    });

    const allTypesDiets = await TypeDiet.findAll();
    res.send(allTypesDiets.map(el => el.name));
    });
    




module.exports = router;
