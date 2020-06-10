import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import App from "./App";
import reducer from "./components/reducers/";
import firebase from "./fire";

// included redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(getFirebase))
);
const store = createStore(reducer, enhancers);

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
    attachAuthIsReady: true
};
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector("#root")
);
