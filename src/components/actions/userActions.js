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

export const signUp = (newUser) => async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    var uid;
    await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            uid = userCredential.user.uid;
        })
        .catch((err) => {
            dispatch({ type: "SIGNUP_FAILED", payload: err });
        });

    firestore
        .collection("users")
        .doc(uid)
        .set({
            username: newUser.username,
            email: newUser.email,
            createdAt: new Date()
        })
        .then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
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

export const clearFeedback = () => {
    return { type: "CLEAR_FEEDBACK" };
};

export const likeRecipe = (user, recipeId) => (
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
                .collection("likes")
                .doc(`${user.uid}`)
                .set({
                    createdBy: user.username,
                    createdAt: new Date()
                })
                .then(() => {
                    dispatch({ type: "RECIPE_LIKED" });
                });
        });
};

export const hasLikedRecipe = (userId, recipeId) => (
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
                .collection("likes")
                .doc(`${userId}`)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        dispatch({ type: "HAS_LIKED_RECIPE" });
                    } else {
                        dispatch({ type: "HAS_NOT_LIKED_RECIPE" });
                    }
                });
        });
};

export const unlikeRecipe = (userId, recipeId) => (
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
                .collection("likes")
                .doc(`${userId}`)
                .delete()
                .then(() => {
                    dispatch({ type: "RECIPE_UNLIKED" });
                });
        });
};

export const favARecipe = (userId, recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("favourites")
        .doc(recipeId)
        .set({
            id: recipeId,
            createdAt: new Date()
        })
        .then(() => {
            dispatch({ type: "RECIPE_FAVOURITED" });
        });
};

export const unfavARecipe = (userId, recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("favourites")
        .where("id", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs[0].ref.delete().then(() => {
                dispatch({ type: "RECIPE_UNFAVOURITED" });
            });
        });
};

export const fetchFav = (userId) => (dispatch, getState, getFirebase) => {
    const recipeIds = [];
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("favourites")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                recipeIds.push(doc.get("id"));
            });
            dispatch({ type: "FETCH_FAVOURITES", payload: recipeIds });
        });
};

export const hasFavRecipe = (userId, recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("favourites")
        .doc(recipeId)
        .get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                dispatch({ type: "HAS_FAVOURITED_RECIPE" });
            } else {
                dispatch({ type: "HAS_NOT_FAVOURITED_RECIPE" });
            }
        });
};
