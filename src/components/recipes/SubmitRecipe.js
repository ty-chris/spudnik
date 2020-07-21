import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { submitRecipe } from "../actions/recipeActions";
import {
    renderInput,
    renderIngredients,
    renderDirections,
} from "../recipes/RenderRecipeForm";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    buttonSpace: { padding: "20px" },
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

// Setting padding betweem fields
const fieldPadding = "5px";

class SubmitRecipe extends React.Component {
    onSubmit = (formValues) => {
        //console.log(formValues);
        if (window.confirm("Are you sure?")) {
            this.props.submitRecipe(formValues);
        }

        setTimeout(() => {
            this.props.history.push("/");
        }, 1500);
    };

    render() {
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
                            <h2>Submit a Recipe!</h2>
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
                            <Grid
                                container
                                justify="center"
                                style={{ padding: "10px" }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="name"
                                        component={renderInput}
                                        label="Enter Name of Recipe"
                                        validate={[required, maxLength30]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: { fieldPadding } }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="duration"
                                        component={renderInput}
                                        label="Enter Time required in Minutes"
                                        type="number"
                                        validate={[number, minValue1]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: { fieldPadding } }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="servings"
                                        component={renderInput}
                                        label="Enter Number of Servings"
                                        type="number"
                                        validate={[number, minValue1]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                //style={{ padding: { fieldPadding } }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <FieldArray
                                        name="ingredients"
                                        component={renderIngredients}
                                    />
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                //style={{ padding: { fieldPadding } }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <FieldArray
                                        name="directions"
                                        component={renderDirections}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: { fieldPadding } }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="image"
                                        component={renderInput}
                                        label="Enter image URL(optional)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: "10px" }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="video"
                                        component={renderInput}
                                        label="Enter video URL(optional)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: "10px" }}
                            >
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="details"
                                        component={renderInput}
                                        label="Enter recipe details"
                                        multiline
                                        validate={[required]}
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
        submitRecipe: (newRecipe) => dispatch(submitRecipe(newRecipe)),
    };
};

export default compose(
    reduxForm({
        form: "SubmitRecipe",
        initialValues: {
            ingredients: [""],
            directions: [""],
        },
    }),
    withStyles(useStyles),
    connect(null, mapDispatchToProps),
    withRouter
)(SubmitRecipe);
