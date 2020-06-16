import React from "react";
import ReactPlayer from "react-player/youtube";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
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

import CommentList from "../user/CommentList";

const useStyles = (theme) => ({
    root: {
        width: "100vw",
        height: "auto",
        display: "flex",
        align: "center",
        margin: "auto",
    },
    directions: {
        position: "justify",
        padding: "20px",
    },
    table: {
        display: "flex",
        margin: "auto",
    },
    card: {
        margin: "auto",
    },
    formControl: {
        position: "flex",
        minWidth: 100,
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

        let currAmount = this.props.recipe.amount;

        if (
            this.state.numServes !== "" &&
            this.state.numServes !== this.props.recipe.serves
        ) {
            currAmount = currAmount.map((amount) => {
                var split = amount.split(" ");

                if (!isNaN(split[0]) && split[0] !== "") {
                    var newAmount =
                        (split[0] / this.props.recipe.serves) *
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
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        alt={this.props.recipe.name}
                        image={this.props.recipe.image}
                        title={this.props.recipe.name}
                        height="600"
                    />
                    {this.props.recipe.video ? (
                        <ReactPlayer
                            url={this.props.recipe.video}
                            height="540px"
                            width="960px"
                            config={{
                                youtube: {
                                    playerVars: { controls: 1 },
                                },
                            }}
                            style={{
                                margin: "auto",
                                paddingTop: "20px",
                            }}
                        />
                    ) : null}
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="span"
                            align="center"
                        >
                            <h2>{this.props.recipe.name}</h2>
                            <p>
                                Cook Time: {this.props.recipe.duration} Minutes
                            </p>
                        </Typography>
                        <Grid container justify="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="number-serves">
                                    Servings
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={this.props.recipe.serves}
                                    inputProps={{
                                        name: "serves",
                                        id: "number-serves",
                                    }}
                                    onChange={this.handleChangeServe}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                </NativeSelect>
                                <FormHelperText>
                                    Input number of servings
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Box className="classes.table">
                            <TableContainer component={Paper}>
                                <Table>
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
                                                <TableRow key={ingredient}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {ingredient}
                                                    </TableCell>
                                                    <TableCell>
                                                        {currAmount[index]}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
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
                                            {index + 1}. {direction}
                                        </li>
                                    )
                                )}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Like
                        </Button>
                        <Button size="small" color="primary">
                            Favourite
                        </Button>
                    </CardActions>
                    <CardContent>
                        <CommentList recipeId={this.props.recipe.id} />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state from details", state);

    const recipes = state.recipes;
    const recipe = recipes.find(({ id }) => id === ownProps.match.params.id);

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
