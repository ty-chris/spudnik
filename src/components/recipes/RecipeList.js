import React from "react";
import { connect } from "react-redux";
import { getRecipesThunk } from "../actions/recipeActions";

//Theme
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import RecipeCard from "./RecipeCard";

class RecipeList extends React.Component {
    /*onSearchInputChange = (event) => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ setString: "" });
    }
    this.getRecipes();
  };*/

    componentDidMount() {
        this.props.getRecipesThunk();
    }

    render() {
        console.log("recipes", this.props.recipes);
        return (
            <div>
                {(this.props.recipes && this.props.recipes.length) > 0 ? (
                    <div>
                        <TextField
                            style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Recipes"
                            margin="normal"
                            onChange={this.searchInputChange}
                        />
                        <Grid
                            container
                            spacing={2}
                            style={{ padding: 24, height: "100%" }}
                        >
                            {this.props.recipes.map((currentRecipe) => (
                                <Grid
                                    key={currentRecipe.id}
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <RecipeCard recipe={currentRecipe} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : (
                    "No recipes found"
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("state", state);
    return {
        recipes: state.recipes,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(getRecipesThunk());
    return {
        getRecipesThunk: getRecipesThunk,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
