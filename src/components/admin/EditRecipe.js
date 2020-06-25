import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { editRecipe } from "../actions/recipeActions";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
/*import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";*/

import { withStyles } from "@material-ui/core/styles";

//const required = (value) => (value ? undefined : "Required");

const useStyles = (theme) => ({
    card: { margin: "auto" },
});

class EditRecipe extends React.Component {
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

    renderIngredients = ({ fields, meta: { error } }) => {
        return (
            <ul>
                <List>
                    <h2>Ingredients</h2>editRecipe
                </List>
            </ul>
        );
    };

    onSubmit = (formValues) => {
        console.log(formValues);
        if (window.confirm("Are you sure?")) {
            this.props.editRecipe(formValues);
        }
    };

    render() {
        const { classes } = this.props;

        if (!this.props.recipe) {
            return null;
        }

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt={this.props.recipe.name}
                    image={this.props.recipe.image}
                    title={this.props.recipe.name}
                    height="600"
                />
                <CardContent>
                    <Typography variant="h6" component="span" align="center">
                        <h2>Edit {this.props.recipe.name} Recipe</h2>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editRecipe: (editedRecipe) => dispatch(editRecipe(editedRecipe)),
    };
};

const mapStateToProps = (state, ownProps) => {
    const recipes = state.recipes;
    const recipe = recipes.find(({ id }) => id === ownProps.match.params.id);

    console.log("recipes", recipes);
    console.log("detailed recipe", recipe);

    return {
        recipes: recipes,
        recipe: recipe,
    };
};

export default compose(
    reduxForm({
        form: "EditRecipe",
    }),
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(EditRecipe);
