import React from 'react'

const BoxRecipe = ({recipeName,recipeIngredients,recipeInstruction,recipeImageUrl,recipeCookingTime,recipeOwner, recipeId }) => {
  return (
    <div>
        <br />
        <h1>Name : {recipeName}</h1>
        <img src="" alt="" />
        <h1>Recipe Ingredient : </h1>
        <ul>
            {recipeIngredients.map((ingredient,index)=>{
                return <li key={index+1}>  {index+1}. {ingredient}</li>
            })}
        </ul>
        <p>Cooking Time : {recipeCookingTime}</p>
        <h1>
            Recipe Instruciton : 
        </h1>
        <p>
            {recipeInstruction}
        </p>
        <ul>
            {recipeInstruction.map((instruction,index)=>{
                return <li key={index+1}>  {index+1}. {instruction}</li>
            })}
        </ul>
        <img src={recipeImageUrl} alt={recipeImageUrl}/>
        <h1>Recipe image url :{recipeImageUrl}</h1>
        <h4>Recipe Owner : {recipeOwner}</h4>
        <h4>Recipe Id : {recipeId}</h4>
        <br />
        
    </div>
  )
}

export default BoxRecipe