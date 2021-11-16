import  React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getRecipesByID } from '../../actions';
import character from './Detail.module.css'

import { Link } from 'react-router-dom';


export default function DetailRecipe(){
    const dispatch = useDispatch();
    const recipeById = useSelector((state) => state.details);
    console.log('este es el detail', recipeById)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRecipesByID(id));
    },[dispatch, id])

    return(
        <div className={character.bottom}>
            <div>
            <Link to='/home'><button className={character.button}>HOME</button> </Link>
            </div>
            <div>
            {
                recipeById.length > 0 ?
            <div className={character.detail}>
                
                <h1 className={character.detail_c}>{recipeById[0].title}</h1>
                <img className={character.img}src={recipeById[0].img? recipeById[0].img : recipeById[0].img} alt='Image not found'/>
                <h3 className={character.resume}>Type: {recipeById[0].typeDiets.map((el) => el.name)}</h3>
                <h4 className={character.resume}>Dish Type: {recipeById[0].dishTypes? recipeById[0].dishTypes.map((el) => el.name) : 'dish type not found'}</h4>
                <h5 className={character.resume}>Summary: <p>{recipeById[0].resume? recipeById[0].resume:<div dangerouslySetInnerHTML={{ __html: recipeById[0].summary }} />}</p> </h5>
                <h5 className={character.resume}>HealthScore: {recipeById[0].healthScore}</h5>
                <h5 className={character.resume_p}>Puntutation: {recipeById[0].spoonacularScore}</h5>
                <h5 className={character.steps}>Steps:{ Array.isArray(recipeById[0].analyzedInstructions) ? recipeById[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : recipeById[0].analyzedInstructions }</h5>
            </div> :

            <div> <h2> Loading...</h2></div>
            
            }
            </div>
        </div>

    )
};

