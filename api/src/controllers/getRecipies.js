const axios = require ('axios');
const {Sequelize} = require('sequelize');
const { Recipe, TypeDiet } = require('../db');
const { API_KEY } = process.env;

const getDataApi = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            typDiets: e.diets.map((el) => {return{name:el}}), // mapeo el array con los tipos de dietas
            healthScore: e.healthScore,
            dishTypes: e.dishTypes.map((el) => {return{name:el}}),
            spoonacularScore: e.spoonacularScore,
            img: e.image,
            analyzedInstructions: e.analyzedInstructions.map(el=> el)
        };
    });
    console.log(apiInfo)
    return apiInfo;
};

const getInfoDb = async () => { 
    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            throw: {
                attributes: []
            }
        }
    });
};

const getAllRecipes = async () => {
    const inApi = await getInfoDb();
    const inDb = await getInfoDb();
    const allRecipes = [...inApi, ...inDb];
    //console.log(allRecipes)
    return allRecipes;
};


module.exports = {
    getDataApi, 
    getInfoDb,
    getAllRecipes,
}