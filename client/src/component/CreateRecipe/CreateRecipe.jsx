import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import {getTypeDiet , postRecipe} from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import character from './CreateRecipe.module.css'


function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.title) errors.title= 'please put the title of the recipe'
    if(!input.summary) errors.summary= 'please put the summary of the recipe'
    if(input.spoonacularScore<0 || input.spoonacularScore>100 || !reg.test(input.spoonacularScore)) errors.spoonacularScore='put a puntuation between 0-100'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='put a healthScore between 0-100'
    return errors
}


export default function CreateRecipe() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.typesDiet )
    console.log('esto es diet',listDiets);
    const [errors,setErrors]=useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [input,setInput] = useState({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getTypeDiet())
        },[dispatch])
 function handleChange(e){
        setInput({
            ...input,
    [e.target.name] : e.target.value
})
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
}
function handleSelect(e){
    setInput({
        ...input,
        typeDiets:[...input.typeDiets, e.target.value]
    })
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(postRecipe(input))
    alert('Congratulations you created a new recipe!')
    setInput({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })
}

    return (
        <div className={character.bottom}>
        <div >
            <Link to ='/home' ><button className={character.button}>Back to Home</button></Link>
            <h1 className={character.text}>Create you recipe</h1>
            <form onSubmit={(e) => {handleSubmit(e)}} className={character.form}>
                <div>
                    <label className={character.label}>Name: </label>
                    <input  className={character.input_text}
                    type='text'
                    name='title'
                    value={input.title}
                    onChange={(e) => {handleChange(e)}}
                    />
                    { errors.title && (
                        <p className={character.error}>{errors.title}</p>
                    ) }
                </div>
                <div>
                    <label className={character.label}>Summary: </label>
                    <input className={character.input_text}
                    type='text'
                    name='summary'
                    value={input.summary}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.summary && (
                        <p className={character.error}>{errors.summary}</p>
                    ) }
                </div>
                <div>
                    <label className={character.label}>Score: </label>
                    <input  className={character.input_text}
                    type='text'
                    name='spoonacularScore'
                    value={input.spoonacularScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.spoonacularScore && (
                        <p className={character.error}>{errors.spoonacularScore}</p>
                    ) }
                </div>
                <div>
                    <label className={character.label}>Health Score: </label>
                    <input  className={character.input_text}
                    type='text'
                    name='healthScore'
                    value={input.healthScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.healthScore && (
                        <p className={character.error}>{errors.healthScore}</p>
                    ) }
                </div>
                <div>
                    <label className={character.label}>Step by Step: </label>
                    <input  className={character.input_step}
                    type='text'
                    name='analyzedInstructions'
                    value={input.analyzedInstructions}
                    onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select
                    onChange={(e) => {
                    handleSelect(e);
                    }}
                >
                <option className={character.input}>Select Diet Type</option>
                        {listDiets?.map((t) => {
                            
                            return <option value={t}> {t} </option>
                            
                            })}
                </select>
                <ul>
                    {input.typeDiets &&
                    input.typeDiets.map((el) => {
                        return <li key={el.name}>{el}</li>;
                    })}
                </ul>
                <button className={character.button} type="submit">
                    Create Recipe
                </button>
                </form>
            </div>
        </div>
    )

}