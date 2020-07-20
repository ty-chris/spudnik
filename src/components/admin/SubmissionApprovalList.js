import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

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

import { getSubmittedRecipes } from "../actions/recipeActions";

class SubmissionApproval extends React.Component {
    componentDidMount() {
        this.props.getSubmittedRecipes();
    }

    render() {
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
                            <List dense>
                                {this.props.submittedRecipes.map((recipe) => {
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
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="approve"
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
                    <LinearProgress color="secondary" />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state from list", state);
    return {
        submittedRecipes: state.submittedRecipes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSubmittedRecipes: () => dispatch(getSubmittedRecipes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionApproval);
