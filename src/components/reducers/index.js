import { combineReducers } from "redux";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import { reducer as formReducer } from "redux-form";

import { recipesReducer } from "./recipeReducer";
import userReducer from "./userReducer";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    recipes: recipesReducer,
    user: userReducer,
    form: formReducer,
});
