import React from "react";
import { connect } from "react-redux";
import { getRecipesThunk } from "../actions/recipeActions";

//Theme
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import RecipeCard from "./RecipeCard";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    textField: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    formControl: {
        minWidth: 120,
    },
});

class RecipeList extends React.Component {
    state = {
        searchString: "",
        sortMethod: "",
    };

    componentDidMount() {
        if (!this.props.recipe) {
            this.props.getRecipesThunk();
        }
    }

    onSearchInputChange = (event) => {
        this.setState({
            searchString: event.target.value,
        });
    };

    onSortMethodChange = (event) => {
        this.setState({
            sortMethod: event.target.value,
        });
    };

    render() {
        //console.log("recipes", this.props.recipes);
        //console.log("search", this.state.currentDisplay);
        const { classes } = this.props;

        let currentList = this.props.recipes;

        if (this.state.sortMethod === "name") {
            currentList = currentList.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else if (this.state.sortMethod === "latest") {
            currentList = currentList.sort((a, b) => b.createdAt - a.createdAt);
        } else if (this.state.sortMethod === "earliest") {
            currentList = currentList.sort((a, b) => a.createdAt - b.createdAt);
        } else {
            currentList = this.props.recipes;
        }

        if (this.state.searchString !== "") {
            currentList = currentList.filter((recipe) => {
                const name = recipe.name.toLowerCase();
                const filter = this.state.searchString.toLowerCase();

                return name.includes(filter);
            });
        }

        return (
            <div>
                {(this.props.recipes && this.props.recipes.length) > 0 ? (
                    <div>
                        <div>
                            <form className={classes.root}>
                                <TextField
                                    className={classes.textField}
                                    id="searchInput"
                                    placeholder="Search for Recipes"
                                    margin="normal"
                                    onChange={this.onSearchInputChange}
                                />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="sort-native-simple">
                                        Sort By
                                    </InputLabel>
                                    <Select
                                        value={this.state.sortMethod}
                                        onChange={this.onSortMethodChange}
                                        inputProps={{
                                            name: "sortMethod",
                                            id: "sort-method-helper",
                                        }}
                                    >
                                        <option value={""}>Default</option>
                                        <option value={"name"}>A-Z</option>
                                        <option value={"latest"}>Latest</option>
                                        <option value={"earliest"}>
                                            Earliest
                                        </option>
                                    </Select>
                                </FormControl>
                            </form>
                        </div>
                        <Grid
                            container
                            spacing={2}
                            style={{ padding: 24, height: "100%" }}
                        >
                            {currentList.map((currentRecipe) => (
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
                    <LinearProgress color="secondary" />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("state from list", state);
    return {
        recipes: state.recipes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesThunk: () => dispatch(getRecipesThunk()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(RecipeList));
