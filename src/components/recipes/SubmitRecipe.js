import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Divider from "@material-ui/core/Divider";
//import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { submitRecipe } from "../actions/recipeActions";

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

class SubmitRecipe extends React.Component {
    renderInput = ({
        input,
        label,
        meta: { touched, invalid, error },
        ...custom
    }) => {
        return (
            <TextField
                label={label}
                variant="outlined"
                fullWidth
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}
            />
        );
    };

    renderFormHelper = ({ touched, error }) => {
        if (!(touched && error)) {
            return;
        } else {
            return <FormHelperText>{touched && error}</FormHelperText>;
        }
    };

    /*renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    }) => {
        return (
            <FormControl error={touched & error}>
                <Select
                    native
                    {...input}
                    {...custom}
                    inputProps={{
                        name: "servings",
                    }}
                >
                    {children}
                </Select>
                {this.renderFormHelper({ touched, error })}
            </FormControl>
        );
    };*/

    renderIngredients = ({ fields, meta: { error } }) => {
        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <List>
                        <h2>Ingredients</h2>
                    </List>
                </Grid>
                {fields.map((ingredient, index) => (
                    <List key={index}>
                        <ListItem alignItems="center">
                            <div>
                                <Field
                                    name={`${ingredient}.ingredient`}
                                    type="text"
                                    component={this.renderInput}
                                    label={`Ingredient #${index + 1}`}
                                    validate={[required]}
                                />
                            </div>
                            <div style={{ paddingLeft: "10px" }}>
                                <Field
                                    name={`${ingredient}.amount`}
                                    type="text"
                                    component={this.renderInput}
                                    label={`Amount of Ingredient #${index + 1}`}
                                    validate={[required]}
                                />
                            </div>
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => fields.remove(index)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                ))}
                <Grid
                    className={classes.buttonSpace}
                    container
                    justify="center"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.push()}
                    >
                        Add ingredient
                    </Button>
                </Grid>
                {error && <li className="error">{error}</li>}
            </div>
        );
    };

    renderDirections = ({ fields, meta: { error } }) => {
        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <List>
                        <h2>Directions</h2>
                    </List>
                </Grid>
                {fields.map((direction, index) => (
                    <List key={index}>
                        <ListItem alignItems="center" width={1}>
                            <Field
                                name={direction}
                                type="text"
                                component={this.renderInput}
                                label={`Direction #${index + 1}`}
                                validate={[required]}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => fields.remove(index)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                ))}
                <Grid
                    className={classes.buttonSpace}
                    container
                    justify="center"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.push()}
                    >
                        Add direction
                    </Button>
                </Grid>
                {error && <li className="error">{error}</li>}
            </div>
        );
    };

    onSubmit = (formValues) => {
        //console.log(formValues);
        if (window.confirm("Are you sure?")) {
            this.props.createRecipe(formValues);
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
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="name"
                                        component={this.renderInput}
                                        label="Enter Name of Recipe"
                                        validate={[required, maxLength30]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="duration"
                                        component={this.renderInput}
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
                                        component={this.renderInput}
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
                                        component={this.renderIngredients}
                                    />
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={8}>
                                    <FieldArray
                                        name="directions"
                                        component={this.renderDirections}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="image"
                                        component={this.renderInput}
                                        label="Enter image URL"
                                        validate={[required]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="video"
                                        component={this.renderInput}
                                        label="Enter video URL(optional)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="details"
                                        component={this.renderInput}
                                        label="Enter recipe details"
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
