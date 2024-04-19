import express from "express";
import { RecipeModel } from "../model/Recipes.js";
import mongoose from "mongoose";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.find({});
    res.json(recipe);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const recipeData = req.body;
  const newRecipe = new RecipeModel(recipeData);
  try {
    const response = await newRecipe.save();
    return res.json({ message: "Recipe Saved Successfully!!!" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
  const recipe = await RecipeModel.findById(req.body.recipeId);
  user.savedRecipes.push(recipe) ; 
  await user.save() ; 
  res.json({savedRecipe : user.savedRecipes}) ; 
  } catch (err) {
    res.json({ message: err });
  }
});



router.get("/savedRecipes/ids" , async (req,res)=>{
    try{
        
    }catch(err){
        console.error(err) ;
    }
})

export { router as recipeRouter };
