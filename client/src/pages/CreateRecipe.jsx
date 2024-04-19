import React from "react";
import { useState } from "react";
import axios from "axios";
import config from "../configuration/config";

const IngredientInput = React.memo(({ value, onChange, onDelete }) => {
  return (
    <>
      <label htmlFor="ingredient">Enter Ingredient Names : </label>
      <input
        value={value}
        type="text"
        name="ingredient"
        id="ingredient"
        onChange={onChange}
        required
      />
      <button onClick={onDelete}>Delete</button>
    </>
  );
});

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [ingredientsValues, setIngredientsValues] = useState([""]);
  const [recipeSteps, setRecipeSteps] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookingTime, setCookingTime] = useState(0);

  const handleAddIngredientButton = (event) => {
    event.preventDefault();
    setIngredientsValues([...ingredientsValues, ""]);
  };

  const handleDeleteIngredientButton = (index) => {
    const ingredientsAfterRemoval = ingredientsValues.filter(
      (_, curIndex) => curIndex !== index
    );
    setIngredientsValues(ingredientsAfterRemoval);
  };

  const hangleIngredientUpdate = (index, newVal) => {
    const ingredientsAfterUpdating = ingredientsValues.map(
      (preVal, curIndex) => {
        if (curIndex === index) return newVal;
        return preVal;
      }
    );
    setIngredientsValues(ingredientsAfterUpdating);
  };

  const handleCreateRecipeFormSubmit = async (event) => {
    const userId = window.localStorage.getItem("userId");
    event.preventDefault();
    try {
      // let  parsedIngredients = ""
      // for (let ele of ingredientsValues){
      //   parsedIngredients = parsedIngredients+ele ; 
      // }
      const response = await axios.post(
        `http://localhost:${config.backendPort}/recipe`,
        {
          name: name,
          // ingredients: parsedIngredients,
          //I think ingredients: ingredientsValues,  (i need to check for this)
          ingredients: ingredientsValues.toString(),
          instructions: recipeSteps,
          imageUrl: imageUrl,
          cookingTime: cookingTime,
          userOwner: userId,
        }
      );
      console.log(response.data.message);
      alert(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleCreateRecipeFormSubmit}
      className="flex flex-col justify-center align-middle"
    >
      <label htmlFor="name">Enter Recipe Name : </label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        required
      />
      {ingredientsValues.map((val, index) => (
        <IngredientInput
          key={index}
          value={ingredientsValues[index]}
          onChange={(event) => {
            hangleIngredientUpdate(index, event.target.value);
          }}
          onDelete={() => {
            handleDeleteIngredientButton(index);
          }}
        />
      ))}
      <button onClick={handleAddIngredientButton}>Add Ingredient</button>
      <textarea
        name="recipeSteps"
        id="recipeSteps"
        cols="30"
        rows="10"
        placeholder="Enter each step in each line"
        value={recipeSteps}
        onChange={(event) => {
          setRecipeSteps(event.target.value);
        }}
        required
      ></textarea>
      <label htmlFor="imageUrl">Enter the Image URL : </label>
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
      />
      <label htmlFor="cookingTime">Enter Cooking Time In Minutes : </label>
      <input
        type="number"
        name="cookingTime"
        id="cookingTime"
        value={cookingTime}
        onChange={(event) => {
          setCookingTime(event.target.value);
        }}
      />

      <button type="submit">add Recipe</button>
    </form>
  );
};

export default CreateRecipe;
