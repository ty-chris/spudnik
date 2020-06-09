import React from "react";
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

import { getRecipesThunk } from "../actions/recipeActions";

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
});

class RecipeDetails extends React.Component {
    componentDidMount() {
        if (!this.props.recipe) {
            this.props.getRecipesThunk();
        }
    }

    render() {
        console.log("details prop", this.props);
        if (!this.props.recipe) {
            return null;
        }

        const { classes } = this.props;
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
                            <p>Serves: {this.props.recipe.serves}</p>
                        </Typography>
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
                                                        {
                                                            this.props.recipe
                                                                .amount[index]
                                                        }
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
                                classes
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
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state from details", state);

    const recipes = state.recipes;
    const recipe = recipes.find(({ id }) => id === ownProps.match.params.id);

    console.log("detailed recipe", recipe);

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
