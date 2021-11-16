import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllRecipes, getTypeDiet } from '../../actions';
import character from './Landing.module.css'

export default function Landing(){
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTypeDiet());
        dispatch(getAllRecipes());
  }, [dispatch]);

    return(
        <div className={character.entry}>
            <h1 className={character.text}>Welcome !</h1>
            <div className={character.wrap}>
                <Link to='/home'>
                    <button className={character.button}>HOME</button>
                </Link>
            </div>
        </div>
    );
};