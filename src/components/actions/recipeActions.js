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

export const getSubmittedRecipes = () => async (dispatch) => {
    const submittedRecipes = [];

    await firebase
        .firestore()
        .collection("submittedRecipes")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((recipe) => {
                submittedRecipes.push(recipe.data());
            });
            submittedRecipes
                ? dispatch({ type: "GET_SUBMITTED", payload: submittedRecipes })
                : dispatch({ type: "GET_SUBMITTED_ERROR" });
        });
};

export const editSubmittedRecipe = (updatedRecipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("submittedRecipes")
        .doc(updatedRecipe.id)
        .set({ ...updatedRecipe, edited: true })
        .then(() => {
            dispatch({ type: "EDIT_SUBMITTED_RECIPE", payload: updatedRecipe });
        })
        .catch((err) => {
            dispatch({ type: "EDIT_SUBMITTED_RECIPE_ERROR", err });
        });
};

export const deleteSubmittedRecipe = (recipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("submittedRecipes")
        .doc(recipe.id)
        .delete()
        .then(() => {
            dispatch({ type: "DELETE_SUBMITTED_RECIPE", payload: recipe });
        })
        .catch((err) => {
            dispatch({ type: "DELETE_SUBMITTED_RECIPE_ERROR", err });
        });
};

export const approveSubmittedRecipe = (recipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("recipes")
        .doc(recipe.id)
        .set({
            ...recipe,
            createdAt: new Date(),
        })
        .then(() => {
            dispatch({ type: "APPROVE_SUBMITTED_RECIPE", recipe });
        })
        .catch((err) => {
            dispatch({ type: "APPROVE_SUBMITTED_RECIPE_ERROR", err });
        });
};

// For user submitted recipes
export const submitRecipe = (newRecipe) => (dispatch) => {
    const recipeId = newRecipe.name.replace(/\s+/g, "-").toLowerCase();

    // async call to database
    firebase
        .firestore()
        .collection("submittedRecipes")
        .doc(recipeId)
        .set({
            ...newRecipe,
            createdAt: new Date(),
            id: recipeId,
        })
        .then(() => {
            //console.log("submitted recipe successfully!");
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

export const deleteRecipe = (recipe) => (dispatch) => {
    //async call to database
    firebase
        .firestore()
        .collection("recipes")
        .doc(recipe.id)
        .delete()
        .then(() => {
            dispatch({ type: "DELETE_RECIPE" });
        })
        .catch((err) => {
            dispatch({ type: "DELETE_RECIPE_ERROR", err });
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
            //console.log("submitted recipe successfully!");
            dispatch({ type: "CREATE_RECIPE", recipe });
        })
        .catch((err) => {
            dispatch({ type: "CREATE_RECIPE_ERROR" }, err);
        });
};
