import React from "react";

// Components
import AppBar from "./components/layout/AppBar";
import RecipeList from "./components/recipes/RecipeList";
import About from "./components/About";
import RecipeDetails from "./components/recipes/RecipeDetails";
import Footer from "./components/layout/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00bcd4",
            light: "#88ffff",
            dark: "#009faf",
        },
        secondary: {
            main: "#ec407a",
            light: "#ff77a9",
            dark: "#b4004e",
        },
    },
});

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                        <AppBar />
                        <Switch>
                            <Route path="/" exact component={RecipeList} />
                            <Route
                                path="/recipes"
                                exact
                                component={RecipeList}
                            />
                            <Route
                                path="/recipes/:id"
                                exact
                                component={RecipeDetails}
                            />
                            <Route path="/about" component={About} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                        </Switch>
                    </MuiThemeProvider>
                </div>
                <div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
