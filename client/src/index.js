import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css'

import {Route,RouterProvider, createBrowserRouter , createRoutesFromElements} from 'react-router-dom' ;
import Layout from './Layout';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Auth from './pages/Auth';


// import {disableReactDevTools} from '@fvilers/disable-react-devtools' ;

// if(process.env.NODE_ENV === "production") disableReactDevTools() ; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
      <Route path='' element = {<Home/>}/>
      <Route path='create-recipe'  element ={<CreateRecipe/>} />
      <Route path='saved-recipe' element = {<SavedRecipe/>} />
      <Route path='auth' element = {<Auth/>}/>
      <Route path='*' element = {<Home/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
