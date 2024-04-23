import expres from "express" ; 
import cors from 'cors' ; 
import mongoose from 'mongoose' ; 


//import { userRouter } from "./routes/users"; Without .js got my app into crash
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";


const app = expres() ; 


// When ever data comes from the front end it will be converted into json for easy access by using this nodejs built-in middleware
app.use(expres.json()) ; 

//enables our front end react app to request our cross origin server
app.use(cors()) ; 

//To use user routes like login and register. For separation of concerns
app.use('/auth', userRouter) ; 
app.use('/recipe', recipeRouter)

app.get("/" , (req,res)=>{
    res.send("Hello bro") ; 
})
// mongoose.connect("mongodb+srv://tinesh:sakthi@recipes.n1lrkhu.mongodb.net/") ; 
mongoose.connect("mongodb+srv://tinesh:sakthi@recipes.n1lrkhu.mongodb.net/recipeApp?retryWrites=true&w=majority&appName=recipes")


const PORT = 40025; 
app.listen(PORT , ()=>{console.log(`listenning in the port ${PORT}`)})