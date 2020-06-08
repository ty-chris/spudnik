export const signIn = (credentials) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch((err) => {
            dispatch({ type: "LOGIN_FAILED", payload: err });
        });
};

export const signOut = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        });
};

export const signUp = (newUser) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((res) => {
            return firestore.collection("users").doc(res.user.uid).set({
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date()
            });
        })
        .then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch((err) => {
            dispatch({ type: "SIGNUP_FAILED", payload: err });
        });
};
