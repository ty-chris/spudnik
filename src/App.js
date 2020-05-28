import React from "react";

// Components
import AppBar from "./components/layout/AppBar";
import RecipeList from "./components/recipes/RecipeList";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

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
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar />
                </MuiThemeProvider>
                <RecipeList />
            </div>
        );
    }
}

export default App;
