import React from "react";
import { useState } from "react"; // Importing useState hook from React
import axios from "axios"; // Importing Axios for making HTTP requests
import config from "../configuration/config"; // Importing configuration

const InputComponent = React.memo(
  ({ name, value, onChange, onDelete, index }) => {
    return (
      <>
        <label htmlFor="ingredient">Enter {name} Names : </label>
        <input
          placeholder={name}
          value={value}
          type="text"
          name={name === "Instruction" ? "instruction" : "ingredient"}
          id={name === "Instruction" ? "instruction" : "ingredient"}
          onChange={onChange}
          nth={index}
          required
        />
        <button onClick={onDelete}>Delete</button>
      </>
    );
  }
);

// CreateRecipe component
const CreateRecipe = () => {
  // State variables
  const [name, setName] = useState(""); // Recipe name
  const [ingredientsValues, setIngredientsValues] = useState([""]); // Ingredients list
  const [instructionSteps, setInstructionSteps] = useState([""]); // Recipe steps
  const [image, setImage] = useState(null); // Recipe image
  const [cookingTime, setCookingTime] = useState(0); // Cooking time

  // Add ingredient button handler
  const handleAddIngredientButton = (event) => {
    event.preventDefault();
    setIngredientsValues([...ingredientsValues, ""]);
  };

  // Delete ingredient button handler
  const handleDeleteIngredientButton = (index) => {
    const ingredientsAfterRemoval = ingredientsValues.filter(
      (_, curIndex) => curIndex !== index
    );
    setIngredientsValues(ingredientsAfterRemoval);
  };

  // Ingredient update handler
  const hangleIngredientUpdate = (index, newVal) => {
    const ingredientsAfterUpdating = ingredientsValues.map(
      (preVal, curIndex) => {
        if (curIndex === index) return newVal;
        return preVal;
      }
    );
    setIngredientsValues(ingredientsAfterUpdating);
  };

  const handleAddInstructionButton = (event) => {
    event.preventDefault();
    setInstructionSteps([...instructionSteps, ""]);
  };

  const handleDeleteInstructionButton = (index) => {
    const instructionsAfterRemoval = instructionSteps.filter(
      (_, curIndex) => curIndex !== index
    );
    setInstructionSteps(instructionsAfterRemoval);
  };

  const handleInstructionUpdate = (index, newVal) => {
    const instructionsAfterUpdating = instructionSteps.map(
      (preval, curIndex) => {
        if (curIndex === index) return newVal;
        return preval;
      }
    );
    setInstructionSteps(instructionsAfterUpdating);
  };

  // Create recipe form submission handler
  const handleCreateRecipeFormSubmit = async (event) => {
    const userId = window.localStorage.getItem("userId");
    event.preventDefault();
    try {
      // Creating FormData object
      const formData = new FormData();
      formData.append("name", name);
      console.log(ingredientsValues) ; 
      console.log(instructionSteps)
      formData.append("ingredients", JSON.stringify(ingredientsValues));
      formData.append("instructions", JSON.stringify(instructionSteps));
      formData.append("image", image);
      formData.append("cookingTime", cookingTime);
      formData.append("userOwner", userId);

      // Making POST request to backend
      const response = await axios.post(
        `http://localhost:${config.backendPort}/recipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message);
      alert(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // JSX
  return (
    <form
      onSubmit={handleCreateRecipeFormSubmit}
      className="flex flex-col justify-center align-middle"
    >
      {/* Recipe Name Input */}
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
      {/* Ingredient Inputs */}
      {ingredientsValues.map((val, index) => (
        <InputComponent
          key={index}
          name="Ingredient"
          value={ingredientsValues[index]}
          onChange={(event) => {
            hangleIngredientUpdate(index, event.target.value);
          }}
          onDelete={() => {
            handleDeleteIngredientButton(index);
          }}
          nth={index}
        />
      ))}
      {/* Add Ingredient Button */}
      <button onClick={handleAddIngredientButton}>Add Ingredient</button>

      {instructionSteps.map((val, index) => {
        return (
          <InputComponent
            key={index}
            name="Instruction"
            value={instructionSteps[index]}
            onChange={(event) => {
              handleInstructionUpdate(index, event.target.value);
            }}
            onDelete={() => {
              handleDeleteInstructionButton(index);
            }}
            nth={index}
          />
        );
      })}

      <button onClick={handleAddInstructionButton}>Add Instruction</button>

      {/* Recipe Steps Textarea */}
      {/* <textarea
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
      ></textarea> */}
      {/* Image Input */}
      <label htmlFor="image">Insert Image</label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      {/* Cooking Time Input */}
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
      {/* Submit Button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default CreateRecipe; // Exporting CreateRecipe component
