export const recipesReducer = (state = [], action) => {
    // todo recipe management eg. delete edit
    switch (action.type) {
        case "GET_RECIPES":
            return action.payload;
        case "GET_RECIPES_ERROR":
            //console.log("get recipes error", action.err);
            return state;
        case "SUBMIT_RECIPE":
            return action.payload;
        case "SUBMIT_RECIPE_ERROR":
            console.log("submit recipe error", action.err);
            return state;
        case "CREATE_RECIPE":
            return action.payload;
        case "CREATE_RECIPE_ERROR":
            //console.log("create recipe error", action.err);
            return state;
        case "EDIT_RECIPE":
            return action.payload;
        case "EDIT_RECIPE_ERROR":
            //console.log("edit recipe error", action.err);
            return state;
        case "DELETE_RECIPE":
            return state;
        case "DELETE_RECIPE_ERROR":
            //console.log("delete recipe error", action.err)
            return state;
        default:
            return state;
    }
};

export const submittedReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_SUBMITTED":
            return action.payload;
        case "GET_SUBMITTED_ERROR":
            return state;
        case "EDIT_SUBMITTED_RECIPE":
            return action.payload;
        case "EDIT_SUBMITTED_RECIPE_ERROR":
            return state;
        case "DELETE_SUBMITTED_RECIPE":
            return action.payload;
        case "DELETE_SUBMITTED_RECIPE_ERROR":
            return state;
        case "APPROVE_SUBMITTED_RECIPE":
            return action.payload;
        case "APPROVE_SUBMITTED_RECIPE_ERROR":
            return state;
        default:
            return state;
    }
};
