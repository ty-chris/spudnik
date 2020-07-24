import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipesThunk, deleteRecipe } from "../actions/recipeActions";

//Theme
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

class AdminRecipeList extends React.Component {
    state = {
        searchString: "",
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

    render() {
        //console.log("recipes", this.props.recipes);
        //console.log("search", this.state.currentDisplay);

        //Admin status check
        if (!this.props.user.isAdmin) {
            return null;
        }

        let currentList = this.props.recipes;

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
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h6"
                                component="span"
                                align="center"
                            >
                                <h2>Admin Recipe Page</h2>
                            </Typography>
                            <Grid container justify="center">
                                <TextField
                                    style={{ padding: 24 }}
                                    id="searchInput"
                                    placeholder="Search for Recipes"
                                    margin="normal"
                                    onChange={this.onSearchInputChange}
                                />
                            </Grid>
                            <List dense>
                                {currentList.map((recipe) => {
                                    //console.log(recipe.name);
                                    return (
                                        <div>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <FastfoodIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={recipe.name}
                                                    secondary={new Date(
                                                        recipe.createdAt
                                                            .seconds * 1000
                                                    ).toLocaleDateString(
                                                        "en-gb"
                                                    )}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Link
                                                        to={`/admin/recipes/${recipe.id}`}
                                                        className="item"
                                                    >
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="edit"
                                                            linkButton={true}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    "Are you sure you want to delete?"
                                                                )
                                                            ) {
                                                                this.props.deleteRecipe(
                                                                    recipe
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        window.location.reload(
                                                                            false
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    );
                                })}
                            </List>
                            <Grid container justify="center">
                                <Button variant="contained" color="primary">
                                    <Link
                                        to={`/admin/create-recipe`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Publish new recipe
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <LinearProgress color="secondary" />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesThunk: () => dispatch(getRecipesThunk()),
        deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRecipeList);
