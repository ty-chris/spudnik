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

export const fetchComments = (recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const comments = [];
    const firestore = getFirebase().firestore();
    firestore
        .collection("recipes")
        .where("id", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs[0].ref
                .collection("comments")
                .get()
                .then((qSnapshot) => {
                    qSnapshot.docs.forEach((doc) => {
                        comments.push({ ...doc.data(), id: doc.id });
                    });
                    dispatch({ type: "FETCH_COMMENTS", payload: comments });
                });
        });
};

export const postComment = (comment, recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("recipes")
        .where("id", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs[0].ref
                .collection("comments")
                .add({
                    body: comment.body,
                    createdBy: comment.createdBy,
                    uid: comment.uid,
                    createdAt: new Date()
                })
                .then(() => {
                    dispatch({ type: "COMMENT_POSTED" });
                });
        });
};
