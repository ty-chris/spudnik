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
        });

    //console.log("payload", recipes);
    dispatch({ type: "GET_RECIPES", payload: recipes });
};
