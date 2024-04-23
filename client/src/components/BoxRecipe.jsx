import React from 'react';

const BoxRecipe = ({recipeName, recipeIngredients, recipeInstruction, recipeImageUrl, recipeCookingTime, recipeOwner, recipeId }) => {
  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{recipeName}</h1>
      <img src={recipeImageUrl} alt={recipeName} className="mb-4 rounded-lg" />
      <h2 className="text-lg font-bold mb-2">Recipe Ingredients:</h2>
      <ul className="list-disc pl-6 mb-4">
        {recipeIngredients.map((ingredient, index) => (
          <li key={index} className="mb-2">{index + 1}. {ingredient}</li>
        ))}
      </ul>
      <p className="mb-4"><span className="font-bold">Cooking Time:</span> {recipeCookingTime}</p>
      <h2 className="text-lg font-bold mb-2">Recipe Instruction:</h2>
      <ol className="list-decimal pl-6 mb-4">
        {recipeInstruction.map((instruction, index) => (
          <li key={index} className="mb-2">{instruction}</li>
        ))}
      </ol>
      <h4 className="mb-2"><span className="font-bold">Recipe Owner:</span> {recipeOwner}</h4>
      <h4 className="mb-4"><span className="font-bold">Recipe Id:</span> {recipeId}</h4>
    </div>
  );
}

export default BoxRecipe;
