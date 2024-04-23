import mongoose from "mongoose"; // Importing Mongoose for MongoDB operations

// Creating a Mongoose Schema for Recipe
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the recipe, required field
  ingredients: [{ type: String, required: true }], // Ingredients of the recipe, required field
  instructions: [{ type: String, required: true }], // Cooking instructions, required field
  imageName: { type: String, required: true }, // Name of the image associated with the recipe, required field
  cookingTime: { type: Number, required: true }, // Cooking time in minutes, required field
  userOwner: {
    // Reference to the user who owns the recipe
    type: mongoose.Schema.Types.ObjectId, // Type of the field is ObjectId
    ref: "users", // Referencing the 'users' collection
    required: true, // Required field
  },
});

// Creating a Mongoose Model for Recipe using the defined schema
export const RecipeModel = mongoose.model("recipes", RecipeSchema); // Exporting the RecipeModel
