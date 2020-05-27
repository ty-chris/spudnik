import React from "react";
import RecipeCard from "./RecipeCard";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { db } from "../../fire";

class RecipeList extends React.Component {
  state = {
    recipes: [],
    searchString: "",
  };

  componentDidMount() {

    // async call to load recipes
    this.getRecipes().then((recipes) => this.setState({ recipes }));
  }

  getRecipes = async () => {
    const tempRecipes = [];

    // pull recipe data from firestore
    await db
      .collection("recipes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((recipe) => {
          tempRecipes.push(recipe.data());
        });
      })
      .catch((error) => {
        console.log("Error occurred while fetching data");
        console.log(error);
      });

    return tempRecipes;
  };

  onSearchInputChange = (event) => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ setString: "" });
    }
    this.getRecipes();
  };

  render() {
    // console.log("recipes", this.state.recipes);
    return (
      <div>
        {this.state.recipes ? (
          <div>
            <TextField
              style={{ padding: 24 }}
              id="searchInput"
              placeholder="Search for Recipes"
              margin="normal"
              onChange={this.searchInputChange}
            />
            <Grid container spacing={2} style={{ padding: 24, height:"100%" }} >
              {this.state.recipes.map((currentRecipe) => (
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

export default RecipeList;
