export const recipesReducer = (state = [], action) => {
    // todo recipe management eg. delete edit
    if (action.type === "GET_RECIPES") {
        return action.payload;
    }

    return state;
};

export const getSpecificRecipeReducer = (specificRecipe = null, action) => {
    if (action.type === "GET_RECIPE") {
        return action.payload;
    }

    return specificRecipe;
};
