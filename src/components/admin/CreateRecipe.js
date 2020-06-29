import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

//import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";

import { createRecipe } from "../actions/recipeActions";

const useStyles = (theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "35ch",
        },
    },
    card: { margin: "auto" },
    button: { margin: "auto" },
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
        return (
            <ul>
                <List>
                    <h2>Ingredients</h2>
                </List>
                {fields.map((ingredient, index) => (
                    <List key={index}>
                        <ListItem alignItems="flex-start">
                            <div>
                                <Field
                                    name={`${ingredient}.ingredient`}
                                    type="text"
                                    component={this.renderInput}
                                    label={`Ingredient #${index + 1}`}
                                    validate={[required]}
                                />
                            </div>
                            <div>
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => fields.push()}
                >
                    Add ingredient
                </Button>
                {error && <li className="error">{error}</li>}
            </ul>
        );
    };

    renderDirections = ({ fields, meta: { error } }) => {
        return (
            <ul>
                <List>
                    <h2>Directions</h2>
                </List>
                {fields.map((direction, index) => (
                    <List key={index} disablePadding>
                        <ListItem alignItems="flex-start" width={1}>
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => fields.push()}
                >
                    Add direction
                </Button>
                {error && <li className="error">{error}</li>}
            </ul>
        );
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
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="span" align="center">
                        <h2>Create Recipe!</h2>
                    </Typography>
                </CardContent>
                <Grid container justify="center">
                    <form
                        className={classes.root}
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                        <div>
                            <Field
                                name="name"
                                component={this.renderInput}
                                label="Enter name of Recipe"
                                validate={[required, maxLength30]}
                            />
                        </div>
                        <div>
                            <Field
                                name="duration"
                                component={this.renderInput}
                                label="Enter time required"
                                type="number"
                                validate={[number, minValue1]}
                            />
                        </div>
                        <div>
                            <Field
                                name="servings"
                                component={this.renderInput}
                                label="Enter number of Servings"
                                type="number"
                                validate={[number, minValue1]}
                            />
                            <Divider />
                        </div>
                        <div>
                            <FieldArray
                                name="ingredients"
                                component={this.renderIngredients}
                            />
                            <Divider />

                            <FieldArray
                                name="directions"
                                component={this.renderDirections}
                            />
                            <Divider />
                        </div>
                        <div>
                            <Field
                                name="image"
                                component={this.renderInput}
                                label="Enter image URL"
                                validate={[required]}
                            />
                        </div>
                        <div>
                            <Field
                                name="video"
                                component={this.renderInput}
                                label="Enter video URL(optional)"
                            />
                        </div>
                        <div>
                            <Field
                                name="details"
                                component={this.renderInput}
                                label="Enter recipe details"
                                validate={[required]}
                            />
                        </div>
                        <div>
                            <Button
                                className="classes.button"
                                variant="contained"
                                color="primary"
                                component="span"
                                onClick={this.props.handleSubmit(this.onSubmit)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (newRecipe) => dispatch(createRecipe(newRecipe)),
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
    connect(null, mapDispatchToProps)
)(CreateRecipe);
