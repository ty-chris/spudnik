import React from "react";

// Components
import RecipeList from "./components/recipes/RecipeList";
import About from "./components/About";
import RecipeDetails from "./components/recipes/RecipeDetails";
import StickyFooter from "./components/layout/StickyFooter";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
import TempAppBar from "./components/layout/TempAppBar";

// to be removed
import CommentList from "./components/user/CommentList";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00bcd4",
            light: "#88ffff",
            dark: "#009faf"
        },
        secondary: {
            main: "#ec407a",
            light: "#ff77a9",
            dark: "#b4004e"
        }
    }
});

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                        <TempAppBar />
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
                            <Route path="/comments" component={CommentList} />
                        </Switch>
                    </MuiThemeProvider>
                </div>
                <div>
                    <StickyFooter />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
