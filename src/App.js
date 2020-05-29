import React from "react";

// Components
import AppBar from "./components/layout/AppBar";
import RecipeList from "./components/recipes/RecipeList";
import About from "./components/About";
import RecipeDetails from "./components/recipes/RecipeDetails";
import Footer from "./components/layout/Footer";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00bcd4",
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
                    </MuiThemeProvider>
                    <Switch>
                        <Route path="/" exact component={RecipeList} />
                        <Route path="/recipes" component={RecipeList} />
                        <Route path="/recipes/:id" component={RecipeDetails} />
                        <Route path="/about" component={About} />
                    </Switch>
                </div>
                <div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
