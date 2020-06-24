export const recipesReducer = (state = [], action) => {
    // todo recipe management eg. delete edit
    switch (action.type) {
        case "GET_RECIPES":
            return action.payload;
        case "CREATE_RECIPE":
            return action.payload;
        case "CREATE_RECIPE_ERROR":
            console.log("create recipe error", action.err);
            return state;
        default:
            return state;
    }
};
