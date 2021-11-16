import axios from 'axios';
import { GET_ALL_RECIPES, GET_TYPE_DIET, GET_RECIPES_BY_NAME, GET_RECIPES_BY_ID , FILTER_BY_TYPE_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, RECIPE_ID_DETAIL} from './constants'

export function getAllRecipes(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: json.data
            });
        };
    };

export function getTypeDiet(){
    return async function(dispatch){
        const typeDiet = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: GET_TYPE_DIET,
            payload: typeDiet.data
        });
    };
};

export function getRecipesByID(id){
    return async function(dispatch){
        try{
        const recipeID = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: GET_RECIPES_BY_ID,
            payload: recipeID.data
        })
        }catch(error){
            console.log(error)
    }
    }
};

export function getRecipeByName(name){
    return async function(dispatch){
        const filterName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({
            type: GET_RECIPES_BY_NAME,
            payload: filterName.data
        });
    };
};

export function postRecipe(body){
    return async function(){
        const response = await axios.post('http://localhost:3001/recipes', body);
        return response;
    };
};

export function filterByTypeDiet(payload){
    return {
        type: FILTER_BY_TYPE_DIET,
        payload
    };
};

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export function orderByScore(payload){
    return {
        type: ORDER_BY_SCORE,
        payload
    };
};

export function detailRecipe(payload){
    return {
        type: RECIPE_ID_DETAIL,
        payload
    };
};

