import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByTypeDiet, getAllRecipes, orderByName, orderByScore } from '../../actions/index.js';
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import SearchBar from '../SearchBar/SearchBar'
import character from './Home.module.css'

export default function Home (){

    const dispatch = useDispatch();
    const allRecipes = useSelector ((state) => state.recipes); // es igual que hacer mapStateToProps. Con useSelector me traigo a la constante todo lo que esta en el estado de recipes
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    function handleOnClick(e){
        e.preventDefault();
        dispatch(getAllRecipes())
    }

    function handleFilterTypeDiet(e){
        dispatch(filterByTypeDiet(e.target.value))
    }

    function handleSortByAlf(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setSort(sort + e.target.value)
    }

    function handleScore(e){
        e.preventDefault(e);
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(order + e.target.value)
    }

    
    return(
        <div className={character.section}>
            <section className={character.bottom}>
            <div>
                <SearchBar/>
            </div> 
            <div>
                <Link to='/recipe'> <button className={character.button} >CREATE NEW RECIPE</button></Link>
                <button className={character.button}  onClick={(e) =>{handleOnClick(e)}}>All recipes</button>
            </div>

            <div>
                <select  className={character.input}  onChange={(e) =>{handleSortByAlf(e)}}>
                    <option>Select Order</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                </select>
            </div>

            <div>
                <select className={character.input}  onChange={(e) =>{handleScore(e)}}>
                    <option>Select Score</option>
                    <option value='Highest score'>Highest score</option>
                    <option value='Lowest score'>Lowest score</option>
                </select>
            </div>

            <div>
                <select className={character.input}  onChange={(e) =>{ handleFilterTypeDiet(e)}}>
                    <option value='All'>All Recipes</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='lacto-vegetarian'>Lacto-Vegetarian</option>
                    <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescatarian</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='primal'>Primal</option>
                    <option value='whole 30'>Whole 30</option>
                </select>
                
            </div>
            </section>
              
           <section className={character.bottom}>
            <div className={character.cards}>
                
                { currentRecipes &&
                    currentRecipes?.map((el) => {
                        return(
                            <Card  key={el.id}
                            id={el.id}
                            score={el.healthScore ? el.healthScore : el.score}
                            name={el.title ? el.title : el.name}
                            image={el.img ? el.img : el.img}
                            diets={
                              el.diets ? el.diets : el.typeDiets.map((el) => el.name)
                            }/>
                        
                       
                    )})
                }
            </div>
                <div className={character.paginado}>
                    <Paginado 
                    recipesPerPage = {recipesPerPage}
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}
                    />
                </div> 
           </section>
        </div>
        
    )
}