import mongoose from "mongoose"; // Importing Mongoose for MongoDB operations

// Defining a Mongoose Schema for User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username of the user, required and unique
  password: { type: String, required: true }, // Password of the user, required
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }], // Array of ObjectIds referencing the saved recipes
});

// Creating a Mongoose Model for User using the defined schema
export const UserModel = mongoose.model("users", UserSchema); // Exporting the UserModel
