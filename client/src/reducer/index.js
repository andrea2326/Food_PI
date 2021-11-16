import { GET_ALL_RECIPES, GET_TYPE_DIET, GET_RECIPES_BY_NAME, GET_RECIPES_BY_ID, POST_RECIPE, FILTER_BY_TYPE_DIET, ORDER_BY_NAME, ORDER_BY_SCORE } from '../actions/constants'


const initialState = {
    recipes: [],
    typesDiet: [],
    details: [],
    allRecipes: []
};
console.log('esto es el estado type diets',initialState.typesDiet);

function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_ALL_RECIPES: 
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };

       case GET_TYPE_DIET: 
           return {
               ...state,
               typesDiet: action.payload
           };

       case GET_RECIPES_BY_NAME: 
           return {
               ...state,
               recipes: action.payload
           };

       case GET_RECIPES_BY_ID: 
           return {
               ...state,
               details: action.payload
           };

       case POST_RECIPE:
           return {
               ...state
           };

       case FILTER_BY_TYPE_DIET:
           const rec = state.allRecipes;
           const recipeFilter = action.payload === 'All'? rec : rec.filter((t) => t.typeDiets.find((el) => el.name === action.payload))
           console.log(action.payload)
           return {
                ...state,
                recipes: recipeFilter
           };

       case ORDER_BY_NAME:
            if(action.payload === 'ASC') {
                let orderASC = state.recipes.sort(function (a, b) {
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    };
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    };
                    return 0;
                });
                return {
                    ...state,
                    recipes: orderASC,
                };
            };
            if(action.payload === 'DESC') {
                let orderDES = state.recipes.sort(function (a, b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    };
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                        };
                        return 0;
                    });
                    return {
                        ...state,
                        recipes: orderDES,
                    };
                };

        case ORDER_BY_SCORE:
            if(action.payload === 'Highest score') {
                let orderHighest = state.recipes.sort(function (a, b) {
                    if(a.healthScore > b.healthScore) {
                        return -1;
                    };
                    if(a.healthScore < b.healthScore) {
                        return 1;
                    };
                    return 0;
                });
                return {
                    ...state,
                    recipes: orderHighest,
                };
            };
            if(action.payload === 'Lowest score') {
                let orderLowest = state.recipes.sort(function (a, b) {
                    if(a.healthScore < b.healthScore) {
                        return -1;
                    };
                    if(a.healthScore > b.healthScore) {
                        return 1;
                    };
                    return 0;
                });
                return {
                    ...state,
                    recipes: orderLowest,
                };
            };
    
        default:
            return state;
    };
};

export default rootReducer;