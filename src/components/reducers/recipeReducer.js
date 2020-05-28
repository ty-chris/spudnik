export const recipesReducer = (state = [], action) => {
    // todo recipe management eg. delete edit
    if (action.type === "GET_RECIPES") {
        return action.payload;
    }

    return state;
};

export const selectedRecipeReducer = (selectedRecipe = null, action) => {
    if (action.type === "RECIPE_SELECTED") {
        return action.payload;
    }

    return selectedRecipe;
};

export default recipesReducer;
