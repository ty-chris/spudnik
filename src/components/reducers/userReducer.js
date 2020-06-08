const INIT_STATE = {
    error: null
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
        default:
            return state;
    }
};
