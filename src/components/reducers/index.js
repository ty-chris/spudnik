import { combineReducers } from "redux";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import recipesReducer from "./recipeReducer";
import selectedRecipeReducer from "./recipeReducer";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    recipes: recipesReducer,
    selectedRecipe: selectedRecipeReducer,
});
