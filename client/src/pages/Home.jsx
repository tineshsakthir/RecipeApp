import React, { useEffect, useState, useMemo } from 'react'
import getRecipes from '../utils/retrieveSavedRecipes.js'
import BoxRecipe from '../components/BoxRecipe.jsx'

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRecipes();
      console.log(data);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cachedRecipes = useMemo(() => {
    return recipes;
  }, [recipes]);

  return (
    <div>
      {cachedRecipes.map((recipe, index) => (
        <BoxRecipe
          key={index}
          recipeName={recipe.name}
          recipeIngredients={recipe.ingredients}
          recipeInstruction={recipe.instructions}
          recipeCookingTime={recipe.cookingTime}
          recipeImageUrl={recipe.imageName}
          recipeOwner={recipe.userOwner}
          recipeId={recipe._id}
        />
      ))}
    </div>
  );
};



export default Home ;