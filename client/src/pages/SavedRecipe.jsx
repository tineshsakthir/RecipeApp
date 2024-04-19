import React, { useEffect, useState } from 'react'
import getRecipes from '../utils/retrieveSavedRecipes.js'
import BoxRecipe from '../components/BoxRecipe.jsx'


const SavedRecipe = () => {

  const [recipe, setRecipe] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const data = await getRecipes() ; 
        setRecipe(data) ;
      }catch(err){
        if(err) console.error(err) ;
      }
    }
    fetchData()
  },[])

  const printRecipe = () =>{
    console.log(recipe)
  }


  return (
    <div>

      {recipe.map((recip,index) =>{
        return <BoxRecipe key={index} recipeName={recip.name} recipeIngredients={recip.ingredients} recipeInstruction={recip.instructions} recipeCookingTime= {recip.cookingTime} recipeOwner={recip.userOwner} recipeId = {recip._id} />
      })}

      {/* {recipe && recipe.length ? recipe[0] : recipe[1]} */}
      <button onClick={printRecipe}>click</button>
    </div>
  )

}

export default SavedRecipe