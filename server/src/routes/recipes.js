import express from "express"; // Importing Express.js framework
import { RecipeModel } from "../model/Recipes.js"; // Importing the RecipeModel from the Recipes module
import mongoose from "mongoose"; // Importing Mongoose for MongoDB operations,but mongoose is not needed here, because here we communicate with the db with the help of the mongoose models.
import { UserModel } from "../model/Users.js"; // Importing the UserModel from the Users module
import multer from "multer"; // Importing Multer for handling file uploads
import crypto from "crypto"; // Importing Crypto for generating random bytes

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3"; // Importing AWS SDK for S3 operations

import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner"; // I think this is not need, because it is class, i just need the function getSignedUrl inside that class
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv"; // Importing dotenv for environment variables

import sharp from "sharp"; // To modify the images before pushing into the s3 bucket

dotenv.config(); // Loading environment variables from .env file

const bucketName = process.env.BUCKET_NAME; // Getting bucket name from environment variables
const bucketRegion = process.env.BUCKET_REGION; // Getting bucket region from environment variables
const accessKey = process.env.ACCESS_KEY; // Getting AWS access key from environment variables
const secretAccessKey = process.env.SECRET_ACCESS_KEY; // Getting AWS secret access key from environment variables

const s3 = new S3Client({
  // Creating a new instance of S3Client
  credentials: {
    // Providing AWS credentials
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion, // Setting AWS region
});

const router = express.Router(); // Creating a router object using Express.js

const storage = multer.memoryStorage(); // Creating Multer storage engine that stores files in memory as Buffer objects
const upload = multer({ storage: storage }); // Creating Multer instance with configured storage engine

/**
 * (GET)Route to get all recipes
 */
router.get("/", async (req, res) => {
  // Handling GET request to fetch all recipes
  try {
    const recipes = await RecipeModel.find({}); // Finding all recipes
    const newRecipes = [];
    for (let recipe of recipes) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: recipe.imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log(url);
      recipe["imageName"] = url;
      newRecipes.push(recipe);
    }
    res.json(newRecipes); // Sending recipes as JSON response
  } catch (err) {
    console.log(err); // Logging any errors
  }
});

/**
 * (POST)Route to add a new recipe
 */
router.post("/", upload.single("image"), async (req, res) => {
  // Handling POST request to add a new recipe
  console.log(req.body); // Logging request body
  console.log(req.file); // Logging uploaded file

  try {
    const getImageName = (byte = 15) =>
      crypto.randomBytes(byte).toString("hex"); // Function to generate random image name

    const imageName = req.file?.originalname + getImageName(20); // Generating random image name and adding it with the original file name, to make it unique in the bucket, the bucket name is unique in the world

    const imageBufferAfterSharp = await sharp(req.file.buffer)
      .resize({ height: 1000, width: 1920, fit: "contain" })
      .toBuffer();

    const command = new PutObjectCommand({
      // Creating PutObjectCommand for uploading file to S3
      Bucket: bucketName, // Setting S3 bucket name
      Body: imageBufferAfterSharp, // Setting file content
      Key: imageName, // Setting file name with generated image name
      ContentType: req.file.mimetype, // Setting file content type, i we are saying to the aws that the file type is .jpg or .png or any other like that
    });

    console.log("s3 result", await s3.send(command)); // Sending file to S3
  
    const ingredients = await JSON.parse(req.body.instructions) ; 
    const instructions = await JSON.parse(req.body.ingredients)  ;
    const newRecipe = new RecipeModel({ ...req.body, imageName: imageName,ingredients : ingredients , instructions : instructions }); // Creating new recipe document with uploaded image name
    const response = await newRecipe.save(); // Saving new recipe

    console.log("New Recipe : ",newRecipe) ;
    return res.json({ message: "Recipe Saved Successfully!!!" }); // Sending success response

  } catch (err) {
    console.log(err); // Logging any errors
    res.json({ message: "error occurred" }); // Sending error response
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      res.status(500).json({ message: "Recipe Not Found" });
      return;
    }

    const imageName = recipe.imageName;
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageName,
    });
    await s3.send(command);

    // RecipeModel.deleteOne({_id : id }) ; THis also works, but the below is a different flavour
    RecipeModel.findByIdAndDelete(id);

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * (PUT)Route to add a recipe to user's saved recipes
 */
router.put("/", async (req, res) => {
  // Handling PUT request to add a recipe to user's saved recipes
  try {

    const user = await UserModel.findById(req.body.userId); // Finding user by ID
    const recipe = await RecipeModel.findById(req.body.recipeId); // Finding recipe by ID

    if (!user || !recipe) {
      // If user or recipe not found
      return res.status(404).json({ message: "User or Recipe not found" }); // Sending error response
    }

    user.savedRecipes.push(recipe); // Adding recipe to user's saved recipes
    await user.save(); // Saving user

    res.json({ savedRecipe: user.savedRecipes }); // Sending success response

  } catch (err) {
    res.status(500).json({ message: err }); // Sending error response
  }
});

/**
 * Route to fetch saved recipes IDs
 */
router.get("/savedRecipes/ids", async (req, res) => {
  // Handling GET request to fetch saved recipes IDs
  try {
    // Implementation pending
    const user = await UserModel.findById(req.body.userId);
    res.json({ savedRecipies: user?.savedRecipes });

  } catch (err) {
    console.error(err); // Logging any errors
    res.json(err);
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    //The below i found on chat gpt for fetching the recipies of the current user

    
    // const user1 = await UserModel.findById(req.body.userId).populate("savedRecipes") ; 
    // const savedRecipes1  = user1.savedRecipes ; 
    
    //In the above code, the function "populate()" puts the each recipe object for their respective recipe ObjectId in the user1 document object
    //SO now the user1 is populated with the recipe documents data

  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export { router as recipeRouter }; // Exporting router object as recipeRouter