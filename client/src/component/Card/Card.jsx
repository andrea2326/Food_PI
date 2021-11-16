import React from 'react';
import { Link } from 'react-router-dom'
import character from './Card.module.css'


export default function Card (props){
    return(
       <div key={props.id} className={ character.card}>
           <div className={character.card_title}>
               <h2 >{props.name}</h2>
           </div>
           <div className={character.card_image}>
               <img src={props.image} alt='Image not found'/>
           </div>
           <div className={character.type}>
                    {
                        props.diets &&
                        props.diets.map((e) => {
                            if(typeof e === 'object'){
                                return <span>{e.name}</span> ; 
                            }
                            return <span> -{e}</span> ;
                        })
                    }
           </div>
           <div>  
               <h4 className={character.score}>Score:{props.score}</h4>
               <Link to={`/detail/${props.id}`} className={character.link}>
                    <span>See more</span>
               </Link>
            
           </div>
       </div>
    )
};
