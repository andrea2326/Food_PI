import React from 'react';
import { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { getRecipeByName } from '../../actions'
import character from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");

 
    function handleSearchByName(e){
        e.preventDefault();
        dispatch(getRecipeByName(search)); // Llamo a la función que busca por nombre
        setSearch("")
        // console.log(search)
    }

    function handleNameInput(e){
        setSearch(e.target.value) // seteo el estado interno que creé para luego enviarlo en la funcion
    }
    return(
        <div>
            <input  className={character.input_text}
            type='text'
            value={search} 
            name='name' 
            placeholder='Search...'
            onChange={(e) => { handleNameInput(e) } }>
            </input>
            <button className={character.button} type='submit' onClick={e =>handleSearchByName(e)}>Search</button>
        </div>
    )
}