import { combineReducers } from "redux";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { recipesReducer } from "./recipeReducer";
import userReducer from "./userReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
};

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    recipes: recipesReducer,
    user: userReducer,
    form: formReducer
});

export default persistReducer(persistConfig, rootReducer);
