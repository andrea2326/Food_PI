import React from "react";
import character from './Paginado.module.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for(let i= 0; i< Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className={character.ul}>
                { 
                pageNumbers && pageNumbers.map(number => (
                             <li  key={number}>
                                <a className={character.container} onClick={() => paginado(number)}>{number}</a>
                            </li> 
                    ))}
            </ul>
        </nav>
    )
}