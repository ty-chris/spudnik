// >>> user auth <<<
export const signIn = (credentials) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((userCredential) => {
            dispatch({ type: "LOGIN_SUCCESS" });
            dispatch(getAdminStatus(userCredential.user.uid));
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
    var error;
    await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            uid = userCredential.user.uid;
        })
        .catch((err) => {
            error = err;
            dispatch({ type: "SIGNUP_FAILED", payload: err });
        });

    if (!error) {
        firestore
            .collection("users")
            .doc(uid)
            .set({
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date(),
            })
            .then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
            });
    }
};

export const forgetPasword = (email) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            dispatch({ type: "PASSWORD_RESET_SUCCESS" });
        })
        .catch((err) => {
            dispatch({ type: "PASSWORD_RESET_FAILED", payload: err });
        });
};

export const getAdminStatus = (uid) => (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
            documentSnapshot.get("isAdmin")
                ? dispatch({ type: "USER_IS_ADMIN" })
                : dispatch({ type: "USER_IS_NOT_ADMIN" });
        });
};

export const assignAsAdmin = (email) => (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                dispatch({
                    type: "ADMIN_ASSIGNMENT_FAILED",
                    payload: {
                        title: "Unsuccessful",
                        content: `${email} does not exist`,
                    },
                });
            }

            querySnapshot.forEach((doc) => {
                doc.ref.update({ isAdmin: true }).then(() => {
                    dispatch({
                        type: "ADMIN_ASSIGNED",
                        payload: {
                            title: "Success",
                            content: `${email} is now an admin`,
                        },
                    });
                });
            });
        });
};

export const unassignAsAdmin = (email) => (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    firestore
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                dispatch({
                    type: "ADMIN_UNASSIGNMENT_FAILED",
                    payload: {
                        title: "Unsuccessful",
                        content: `${email} does not exist`,
                    },
                });
            }

            querySnapshot.forEach((doc) => {
                doc.ref.update({ isAdmin: false }).then(() => {
                    dispatch({
                        type: "ADMIN_UNASSIGNED",
                        payload: {
                            title: "Success",
                            content: `${email} is no longer an admin`,
                        },
                    });
                });
            });
        });
};

// >>> comments <<<
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
                .orderBy("createdAt", "desc")
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
                    createdAt: new Date(),
                    edited: false,
                    recipeId: recipeId,
                    rating: comment.value,
                })
                .then(() => {
                    dispatch({ type: "COMMENT_POSTED" });
                    dispatch(fetchComments(recipeId));
                });
        });
};

export const editComment = (recipeId, commentId, newBody, newValue) => (
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
                .doc(commentId)
                .update({
                    body: newBody,
                    edited: true,
                    createdAt: new Date(),
                    rating: newValue,
                })
                .then(() => {
                    dispatch({ type: "COMMENT_EDITED" });
                    dispatch(fetchComments(recipeId));
                });
        });
};

export const deleteComment = (recipeId, commentId) => (
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
                .doc(commentId)
                .delete()
                .then(() => {
                    dispatch({ type: "COMMENT_DELETED" });
                    dispatch(fetchComments(recipeId));
                });
        });
};

export const adminDeleteComment = (recipeId, commentId) => (
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
                .doc(commentId)
                .update({ deletedByAdmin: true })
                .then(() => {
                    dispatch({ type: "COMMENT_DELETED_BY_ADMIN" });
                    dispatch(fetchComments(recipeId));
                });
        });
};

// >>> likes <<<
export const likeRecipe = (user, recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    const firestore = getFirebase().firestore();
    const increment = getFirebase().firestore.FieldValue.increment(1);
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
                    createdAt: new Date(),
                });

            querySnapshot.forEach((doc) => {
                doc.ref.update({ likeCount: increment }).then(() => {
                    dispatch({ type: "RECIPE_LIKED" });
                    dispatch(fetchLikeCount(recipeId));
                });
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
    const decrement = getFirebase().firestore.FieldValue.increment(-1);
    firestore
        .collection("recipes")
        .where("id", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs[0].ref
                .collection("likes")
                .doc(`${userId}`)
                .delete();

            querySnapshot.forEach((doc) => {
                doc.ref.update({ likeCount: decrement }).then(() => {
                    dispatch({
                        type: "RECIPE_UNLIKED",
                    });
                    dispatch(fetchLikeCount(recipeId));
                });
            });
        });
};

export const fetchLikeCount = (recipeId) => (
    dispatch,
    getState,
    getFirebase
) => {
    var likeCount;
    const firestore = getFirebase().firestore();
    firestore
        .collection("recipes")
        .where("id", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                likeCount = doc.data().likeCount ? doc.data().likeCount : 0;
            });
            dispatch({ type: "FETCH_LIKE_COUNT", payload: likeCount });
        });
};

// >>> favourites <<<
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
            createdAt: new Date(),
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
                dispatch(fetchFav(userId));
            });
        });
};

export const fetchFav = (userId) => (dispatch, getState, getFirebase) => {
    const recipeIds = [];
    const favRecipes = [];
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

            recipeIds.forEach((recipeId) => {
                firestore
                    .collection("recipes")
                    .where("id", "==", recipeId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const data = doc.data();
                            const recipe = {
                                name: data.name,
                                image: data.image,
                                id: data.id,
                            };
                            favRecipes.push(recipe);
                        });
                    });
            });

            if (recipeIds.length === 0) {
                dispatch({ type: "FETCH_FAVOURITES", payload: [0] });
            } else {
                dispatch({ type: "FETCH_FAVOURITES", payload: favRecipes });
            }
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

// >>> others <<<
export const resetState = () => {
    return {
        type: "RESET_STATE",
    };
};
