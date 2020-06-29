import firebase from "../../fire";

//Action creator
export const getRecipes = (recipes) => ({
    type: "GET_RECIPES",
    payload: recipes,
});

// Thunks
export const getRecipesThunk = () => async (dispatch) => {
    const recipes = [];
    // pull recipe data from firestore
    await firebase
        .firestore()
        .collection("recipes")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((recipe) => {
                recipes.push(recipe.data());
            });
            recipes
                ? dispatch({ type: "GET_RECIPES", payload: recipes })
                : dispatch({ type: "GET_RECIPES_ERROR" });
        });
    //console.log("payload", recipes);
};

// For user submitted recipes
export const submitRecipe = (newRecipe) => (dispatch) => {
    // async call to database
    firebase
        .firestore()
        .collection("submittedRecipes")
        .add({
            ...newRecipe,
        })
        .then(() => {
            console.log("submitted recipe successfully!");
            dispatch({ type: "SUBMIT_RECIPE", newRecipe });
        })
        .catch((err) => {
            dispatch({ type: "SUBMIT_RECIPE_ERROR" }, err);
        });
    /*.catch((error) => {
            console.log("something bad happened....", error);
        });*/
};

// ADMIN CRUD actions

export const editRecipe = (updatedRecipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("recipes")
        .doc(updatedRecipe.id)
        .update(updatedRecipe)
        .then(() => {
            dispatch({ type: "EDIT_RECIPE", updatedRecipe });
        })
        .catch((err) => {
            dispatch({ type: "EDIT_RECIPE_ERROR", err });
        });
};

export const createRecipe = (recipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("recipes")
        .add({
            ...recipe,
            createdAt: new Date(),
            id: recipe.name.replace(/\s+/g, "-").toLowerCase(),
        })
        .then(() => {
            console.log("submitted recipe successfully!");
            dispatch({ type: "CREATE_RECIPE", recipe });
        })
        .catch((err) => {
            dispatch({ type: "CREATE_RECIPE_ERROR" }, err);
        });
};
