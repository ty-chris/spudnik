import React from "react";
import { Field } from "redux-form";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

const required = (value) => (value ? undefined : "Required");

export const renderInput = ({
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
            fullWidth
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );
};

export const renderIngredients = ({ fields, meta: { error } }) => {
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
                        <Grid container justify="center">
                            <div>
                                <Field
                                    name={`${ingredient}.ingredient`}
                                    type="text"
                                    component={renderInput}
                                    label={`Ingredient #${index + 1}`}
                                    validate={[required]}
                                />
                            </div>
                            <div style={{ paddingLeft: "10px" }}>
                                <Field
                                    name={`${ingredient}.amount`}
                                    type="text"
                                    component={renderInput}
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
                        </Grid>
                    </ListItem>
                </List>
            ))}
            <Grid container justify="center" style={{ paddingBottom: "20px" }}>
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

export const renderDirections = ({ fields, meta: { error } }) => {
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
                            component={renderInput}
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
            <Grid container justify="center" style={{ paddingBottom: "20px" }}>
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
