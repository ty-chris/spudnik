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
            dispatch({ type: "EDIT_RECIPE", payload: updatedRecipe });
        })
        .catch((err) => {
            dispatch({ type: "EDIT_RECIPE_ERROR", err });
        });
};

export const createRecipe = (recipe) => (dispatch) => {
    const recipeId = recipe.name.replace(/\s+/g, "-").toLowerCase();

    //async call to database
    firebase
        .firestore()
        .collection("recipes")
        .doc(recipeId)
        .set({
            ...recipe,
            createdAt: new Date(),
            id: recipeId,
        })
        .then(() => {
            console.log("submitted recipe successfully!");
            dispatch({ type: "CREATE_RECIPE", recipe });
        })
        .catch((err) => {
            dispatch({ type: "CREATE_RECIPE_ERROR" }, err);
        });
};
