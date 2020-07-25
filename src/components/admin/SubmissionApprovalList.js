import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import { compose } from "redux";
//import { makeStyles } from "@material-ui/core/styles";
//import { withStyles } from "@material-ui/core/styles";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
    getSubmittedRecipes,
    deleteSubmittedRecipe,
    approveSubmittedRecipe,
} from "../actions/recipeActions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SubmissionApproval extends React.Component {
    state = {
        searchString: "",
    };

    componentDidMount() {
        this.props.getSubmittedRecipes();
    }

    onSearchInputChange = (event) => {
        this.setState({
            searchString: event.target.value,
        });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            open: false,
        });
    };

    render() {
        //Admin status check
        if (!this.props.user.isAdmin) {
            return null;
        }

        let currentList = this.props.submittedRecipes;

        if (this.state.searchString !== "") {
            currentList = currentList.filter((recipe) => {
                const name = recipe.name.toLowerCase();
                const filter = this.state.searchString.toLowerCase();

                return name.includes(filter);
            });
        }

        return (
            <div>
                {(this.props.submittedRecipes &&
                    this.props.submittedRecipes.length) > 0 ? (
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h6"
                                component="span"
                                align="center"
                            >
                                <h2>User Submitted Recipes</h2>
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
                                                        to={`/admin/submissions/${recipe.id}`}
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
                                                                this.props.deleteSubmittedRecipe(
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
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="approve"
                                                        onClick={() => {
                                                            if (recipe.edited) {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you want to publish?"
                                                                    )
                                                                ) {
                                                                    this.props.approveSubmittedRecipe(
                                                                        recipe
                                                                    );
                                                                    this.props.deleteSubmittedRecipe(
                                                                        recipe
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <Snackbar
                                                                        open={
                                                                            true
                                                                        }
                                                                        autoHideDuration={
                                                                            6000
                                                                        }
                                                                        onClose={
                                                                            this
                                                                                .handleClose
                                                                        }
                                                                    >
                                                                        <Alert
                                                                            onClose={
                                                                                this
                                                                                    .handleClose
                                                                            }
                                                                            severity="error"
                                                                        >
                                                                            Please
                                                                            ensure
                                                                            you
                                                                            have
                                                                            checked
                                                                            the
                                                                            submitted
                                                                            recipe!
                                                                        </Alert>
                                                                    </Snackbar>
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <CheckBoxIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    );
                                })}
                            </List>
                        </Grid>
                    </Grid>
                ) : (
                    <div>
                        {this.props.submittedRecipes.length === 0 ? (
                            <Typography
                                variant="h6"
                                component="span"
                                align="center"
                            >
                                <h2>No User Submitted Recipes</h2>
                            </Typography>
                        ) : (
                            <LinearProgress color="secondary" />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state from list", state);
    return {
        submittedRecipes: state.submittedRecipes,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSubmittedRecipes: () => dispatch(getSubmittedRecipes()),
        deleteSubmittedRecipe: (recipe) =>
            dispatch(deleteSubmittedRecipe(recipe)),
        approveSubmittedRecipe: (recipe) =>
            dispatch(approveSubmittedRecipe(recipe)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionApproval);
