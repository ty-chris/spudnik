import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

import { withStyles } from "@material-ui/core/styles";

import { createRecipe } from "../actions/recipeActions";
import {
    renderInput,
    renderIngredients,
    renderDirections,
} from "../recipes/RenderRecipeForm";

const useStyles = (theme) => ({
    root: {
        width: "100%",
        height: "auto",
        align: "center",
        margin: "auto",
        padding: "auto",
    },
    form: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
        },
        width: "80%",
        align: "center",
        margin: "auto",
        padding: "auto",
    },
    card: { margin: "auto" },
    buttonPadding: { margin: "auto", padding: "auto" },
    buttonSpace: { padding: "10px" },
});

const number = (value) =>
    isNaN(Number(value)) ? "Must be a number" : undefined;
const required = (value) => (value ? undefined : "Required");
const minValue = (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined;
const maxLength = (max) => (value) =>
    value && value.length > max
        ? `Must be ${max} characters or less`
        : undefined;
const maxLength30 = maxLength(30);

const minValue1 = minValue(1);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CreateRecipe extends React.Component {
    state = {
        open: false,
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            open: false,
        });
    };

    onSubmit = (formValues) => {
        console.log(formValues);
        console.log(this.props);
        if (window.confirm("Are you sure?")) {
            this.props.createRecipe(formValues);
            setTimeout(() => {
                this.props.history.push("/admin/recipes");
            }, 1500);
        }

        if (this.props.submitSucceeded) {
            return (
                <div>
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <Alert onClose={this.handleClose} severity="success">
                            Recipe created successfully!
                        </Alert>
                    </Snackbar>
                </div>
            );
        } else {
            return (
                <div>
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <Alert onClose={this.handleClose} severity="error">
                            Recipe failed to create!
                        </Alert>
                    </Snackbar>
                </div>
            );
        }
    };

    render() {
        if (!this.props.user.isAdmin) {
            return null;
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="span"
                            align="center"
                        >
                            <h2>Create Recipe! (For Admin)</h2>
                        </Typography>
                    </CardContent>
                    <Grid
                        container
                        justify="center"
                        direction={"column"}
                        spacing={2}
                    >
                        <form
                            className={classes.form}
                            onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="name"
                                        component={renderInput}
                                        label="Enter Name of Recipe"
                                        validate={[required, maxLength30]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="duration"
                                        component={renderInput}
                                        label="Enter Time required in Minutes"
                                        type="number"
                                        validate={[number, minValue1]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="servings"
                                        component={renderInput}
                                        label="Enter Number of Servings"
                                        type="number"
                                        validate={[number, minValue1]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={8}>
                                    <FieldArray
                                        name="ingredients"
                                        component={renderIngredients}
                                    />
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={8}>
                                    <FieldArray
                                        name="directions"
                                        component={renderDirections}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="image"
                                        component={renderInput}
                                        label="Enter image URL"
                                        validate={[required]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="video"
                                        component={renderInput}
                                        label="Enter video URL(optional)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="details"
                                        component={renderInput}
                                        label="Enter recipe details"
                                        validate={[required]}
                                        multiline
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid
                        className={classes.buttonSpace}
                        container
                        justify="center"
                    >
                        <Button
                            className={classes.buttonPadding}
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={this.props.handleSubmit(this.onSubmit)}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <div>
                        {this.props.submitSucceeded ? (
                            <div>
                                <Snackbar
                                    open={true}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}
                                >
                                    <Alert
                                        onClose={this.handleClose}
                                        severity="success"
                                    >
                                        Recipe submitted successfully!
                                    </Alert>
                                </Snackbar>
                            </div>
                        ) : null}
                    </div>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (newRecipe) => dispatch(createRecipe(newRecipe)),
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default compose(
    reduxForm({
        form: "CreateRecipe",
        initialValues: {
            ingredients: [""],
            directions: [""],
        },
    }),
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateRecipe);
