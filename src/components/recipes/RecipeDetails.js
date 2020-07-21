import React from "react";
import ReactPlayer from "react-player/youtube";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";

import { getRecipesThunk } from "../actions/recipeActions";

import UserFeedback from "../user/UserFeedback";

const useStyles = (theme) => ({
    root: {
        width: "100%",
        height: "auto",
        display: "flex",
        align: "center",
        margin: "auto",
    },
    directions: {
        position: "justify",
        padding: "20px",
    },
    table: {},
    card: {
        margin: "auto",
    },
    formControl: {
        position: "flex",
        minWidth: 100,
    },
    wrapper: {
        position: "relative",
        paddingTop: "56.25%",
    },
    player: {
        position: "absolute",
        top: 5,
        left: 0,
        width: "100%",
        height: "100%",
    },
});

class RecipeDetails extends React.Component {
    state = {
        numServes: "",
    };

    componentDidMount() {
        if (!this.props.recipe) {
            this.props.getRecipesThunk();
        }
    }

    handleChangeServe = (event) => {
        this.setState({
            numServes: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        if (!this.props.recipe) {
            return null;
        }

        let currAmount = [];

        this.props.recipe.ingredients.forEach((ingredient) => {
            currAmount.push(ingredient.amount);
        });

        console.log("currAmount", currAmount);

        // serving calculator logic
        if (
            this.state.numServes !== "" &&
            this.state.numServes !== this.props.recipe.servings
        ) {
            currAmount = currAmount.map((amount) => {
                var split = amount.split(" ");

                if (!isNaN(split[0]) && split[0] !== "") {
                    var newAmount =
                        (split[0] / this.props.recipe.servings) *
                        this.state.numServes;
                } else {
                    return amount;
                }

                if (split.length > 1) {
                    return Math.round(newAmount * 100) / 100 + " " + split[1];
                } else {
                    return Math.round(newAmount * 100) / 100;
                }
            });
        }

        return (
            <div>
                {this.props.recipe ? (
                    <div className={classes.root}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={8} md={6} lg={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        alt={this.props.recipe.name}
                                        image={this.props.recipe.image}
                                        title={this.props.recipe.name}
                                        height="100%"
                                    />
                                    {this.props.recipe.video ? (
                                        <div className={classes.wrapper}>
                                            <ReactPlayer
                                                className={classes.player}
                                                url={this.props.recipe.video}
                                                height="100%"
                                                width="100%"
                                                controls
                                            />
                                        </div>
                                    ) : null}
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            align="center"
                                        >
                                            <h2>{this.props.recipe.name}</h2>
                                            <p>
                                                Cook Time:{" "}
                                                {this.props.recipe.duration}{" "}
                                                Minutes
                                            </p>
                                        </Typography>
                                        <Grid container justify="center">
                                            <FormControl
                                                className={classes.formControl}
                                            >
                                                <InputLabel htmlFor="number-serves">
                                                    Servings
                                                </InputLabel>
                                                <NativeSelect
                                                    defaultValue={
                                                        this.props.recipe
                                                            .servings
                                                    }
                                                    inputProps={{
                                                        name: "servings",
                                                        id: "number-serves",
                                                    }}
                                                    onChange={
                                                        this.handleChangeServe
                                                    }
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                    <option value={9}>9</option>
                                                    <option value={10}>
                                                        10
                                                    </option>
                                                    <option value={11}>
                                                        11
                                                    </option>
                                                    <option value={12}>
                                                        12
                                                    </option>
                                                </NativeSelect>
                                                <FormHelperText>
                                                    Input number of servings
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <TableContainer component={Paper}>
                                            <Table className="classes.table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            <h3>Ingredients</h3>
                                                        </TableCell>
                                                        <TableCell>
                                                            <h3>Amount</h3>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.props.recipe.ingredients.map(
                                                        (ingredient, index) => (
                                                            <TableRow
                                                                key={ingredient}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {
                                                                        ingredient.ingredient
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        currAmount[
                                                                            index
                                                                        ]
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Box className={classes.directions}>
                                            <Typography
                                                gutterBottom
                                                align="left"
                                                variant="body1"
                                                color="textSecondary"
                                                component="span"
                                            >
                                                <h2>Directions:</h2>
                                                {this.props.recipe.directions.map(
                                                    (direction, index) => (
                                                        <li key={index}>
                                                            {index + 1}.{" "}
                                                            {direction}
                                                        </li>
                                                    )
                                                )}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <UserFeedback
                                        recipeId={this.props.recipe.id}
                                        className={classes.userFeedback}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const recipes = state.recipes;
    const recipe = recipes.find(({ id }) => id === ownProps.match.params.id);

    //console.log("recipes", recipes);
    //console.log("detailed recipe", recipe);

    return {
        recipes: recipes,
        recipe: recipe,
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
)(withStyles(useStyles)(RecipeDetails));
