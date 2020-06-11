const INIT_STATE = {
    error: null,
    comments: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("login success");
            return {
                ...state,
                error: null
            };
        case "LOGIN_FAILED":
            console.log("login failed");
            return {
                ...state,
                error: action.payload.message
            };
        case "SIGNOUT_SUCCESS":
            console.log("signout success");
            return state;
        case "SIGNUP_SUCCESS":
            console.log("signup success");
            return {
                ...state,
                error: null
            };
        case "SIGNUP_FAILED":
            console.log("signup failed");
            return {
                ...state,
                error: action.payload.message
            };
        case "FETCH_COMMENTS":
            console.log("fetched comments");
            return {
                ...state,
                error: null,
                comments: action.payload
            };
        case "COMMENT_POSTED":
            console.log("comment posted");
            return state;
        case "CLEAR_COMMENTS":
            console.log("comments cleared");
            return {
                ...state,
                comments: action.payload
            };
        default:
            return state;
    }
};
