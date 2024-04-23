import React from "react";
import { useState } from "react"; // Importing useState hook from React
import axios from "axios"; // Importing Axios for making HTTP requests
import config from "../configuration/config"; // Importing configuration
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const InputComponent = React.memo(
  ({ name, value, onChange, onDelete, index }) => {
    return (
      <>
        <div className="flex flex-row justify-center gap-3 items-center">
        <input
          placeholder={name}
          value={value}
          type="text"
          name={name === "Instruction" ? "instruction" : "ingredient"}
          id={name === "Instruction" ? "instruction" : "ingredient"}
          onChange={onChange}
          nth={index}
          className="text-center border border-zinc-700 rounded-xl"
          required
        />
        <button onClick={onDelete}>Delete</button>
        </div>
        
      </>
    );
  }
);

// CreateRecipe component
const CreateRecipe = () => {
  const navigate  = useNavigate() ; 
  const [cookie, setCookie] = useCookies(["access_token"]);

  
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
    if(!cookie.access_token) {
      alert("Please login the create a recipe!!!") ; 
      return ;
    }
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
    
    <>
   
    <div className="md:p-10 md:ml-10">

    <form
      onSubmit={handleCreateRecipeFormSubmit}
      className="flex flex-col container gap-8 mt-8 mb-8 items-center w-screen"
    >
       <h3 className="text-center text-red-500">{!cookie.access_token ? "please login to create a recipe!!!!! Without login you can't submit the form" : ""}</h3>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 border border-blue-900 rounded-md p-3">
        {/* Recipe Name Input */}
      <label className="text-center"  htmlFor="name">Enter Recipe Name : </label>
      <input
        
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        className="text-center border border-zinc-700 rounded-xl"
        required
      />
      </div>
      <div className="flex flex-col container gap-3 items-center border border-blue-900 rounded-md p-0 pt-3 pb-3">
        {/* Ingredient Inputs */}
      <label htmlFor="ingredient" className="text-center">Enter Ingredients Names : </label>
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
      <button onClick={handleAddIngredientButton}>Add Another Ingredient</button>
      </div>

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

      <button onClick={handleAddInstructionButton}>Add Another Instruction</button>

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
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 border border-violet-600 p-3">
        {/* Image Input */}
      <label htmlFor="image">Insert Image : </label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      </div>
     <div className="flex flex-col md:flex-row justify-center gap-3">
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
        className="text-center border border-zinc-700 rounded-xl"
      />
     </div>
      {/* Submit Button */}
      <button className="border border-black  shadow-orange-800 w-3/4  bg-green-400 rounded-lg" type="submit">Add Recipe</button>
    </form>
    </div>
    </>
  );
};

export default CreateRecipe; // Exporting CreateRecipe component
