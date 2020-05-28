const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignUpData } = require("../util/validators");

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    const { errors, valid } = validateSignUpData(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    }

    const profileImage = "no-img.png";

    let token, userId;

    db.doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ username: "This username already exists" });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                email: newUser.email,
                username: newUser.username,
                createdAt: new Date().toISOString(),
                // TODO: add image url, modify in fbAuth too
                // imageUrl:
                userId,
            };
            return db
                .collection("/users")
                .doc(`${newUser.username}`)
                .set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res
                    .status(400)
                    .json({ email: "This email is already in use" });
            } else {
                return res.status(500).json({
                    general: "Something went wrong, please try again",
                });
            }
        });
};
