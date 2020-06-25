import React from "react";

// Components
import RecipeList from "./components/recipes/RecipeList";
import RecipeDetails from "./components/recipes/RecipeDetails";
import SubmitRecipe from "./components/recipes/SubmitRecipe";
import StickyFooter from "./components/layout/StickyFooter";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
import TempAppBar from "./components/layout/TempAppBar";
import Favourites from "./components/user/Favourites";
import About from "./components/About";
import ScrollToTop from "./components/layout/ScrollToTop";
import EditRecipe from "./components/admin/EditRecipe";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRecipeList from "./components/admin/AdminRecipeList";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateRecipe from "./components/admin/CreateRecipe";

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
                <ScrollToTop />
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
                                component={RecipeDetails}
                            />

                            <Route path="/about" component={About} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/favourites" component={Favourites} />
                        </Switch>
                        <Route
                            path="/recipes/submit"
                            component={SubmitRecipe}
                        />
                        <Route path="/admin" exact component={AdminDashboard} />
                        <Route
                            path="/admin/recipes"
                            exact
                            component={AdminRecipeList}
                        />
                        <Route
                            path="/admin/create-recipe"
                            component={CreateRecipe}
                        />
                        <Route
                            path="/admin/recipes/:id"
                            component={EditRecipe}
                        />
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
