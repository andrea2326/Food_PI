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

const allRecipes = async (req, res) =>{                   
    const { name } = req.query;                                  // Pido el name por query
    if(!name){                                                   // Si no viene ninguno entra al if
        try{
            const recipeApiInfo = await getDataApi();            // Pido todas las recetas a la api
            const recipeDataB = await Recipe.findAll({           // Pido todas las recetas de la DB
                include: {
                    model: TypeDiet,                             // Le pido que incluya el modelo TypeDiet
                    attributes: ['name'],                        // Con la prop name
                    through: {
                        attributes: []
                    },
                },
            });
            return res.send(await Promise.all([...recipeApiInfo, ...recipeDataB])) // Cuando terminen todas las promesas que se concatenen
    
        }catch(err){
            res.json({err});
            console.log(err);
        };
    }else{                                                            // Si el name viene por params entra a este else
        const query = name.toLowerCase();                             // Paso todo a minúscula asi no tengo problemas luego para filtrar
        try{
            const recipeApiInfo = await getDataApi();
            const recipeApi = recipeApiInfo.filter((recipe) => {      
                if(recipe.title.toLowerCase().includes(query)){       // Si el título de la receta que traigo de la api icluye el name que me pasaron x params
                    return recipe;                                    // Lo retorna dentro del array del filter
                };
            });

            const recipeDataB = await Recipe.findAll({                // Lo mismo que lo anterior pero ahora desde la DB
                where: {
                    title:{[Sequelize.Op.like]:`%${query}%`}          // Op(funcion de sql) --> va a filtrar si encuentra algun titulo parecido al nombre que me pasan por query 
                },                                                    // %${query}% --> el % va en los dos lados para decir que lo contenga  
                include :{
                    model: TypeDiet,
                    attributes: ['name'],                             // Hago que la resp también me traiga el tipo de dieta
                    through: {
                        attributes: []
                    },
                },
            });

            const resp = await Promise.all(...recipeDataB, ...recipeApi); // Cuando terminan las promesas las concateno
            console.log(resp.length);
            if(resp.length === 0) {
                res.send(await getAllRecipes());                          // Si no hay match con ninguna, osea, no existe el name pasado por query
                return res.send(resp);                                    // Que devuelva todas las recietas
            };
        }catch(err){
            res.json({err});
            console.log(err);
        };
    };
};


module.exports = {
    getDataApi, 
    getInfoDb,
    getAllRecipes,
    allRecipes
}