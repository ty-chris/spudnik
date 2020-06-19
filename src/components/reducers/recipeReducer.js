export const recipesReducer = (state = [], action) => {
    // todo recipe management eg. delete edit
    if (action.type === "GET_RECIPES") {
        return action.payload;
    }

    return state;
};
