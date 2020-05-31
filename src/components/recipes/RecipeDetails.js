import React from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { getRecipesThunk } from "../actions/recipeActions";

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
        return (
            <div style={{ width: "80%", margin: "auto" }}>
                <Card>
                    <CardMedia
                        component="img"
                        alt={this.props.recipe.name}
                        image={this.props.recipe.image}
                        title={this.props.recipe.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.recipe.title}
                            <p>
                                Cook Time: {this.props.recipe.duration} Minutes
                            </p>
                            <p>Serves {this.props.recipe.serves} </p>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Ingredients placeholder
                        </Typography>
                        <Divider />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <span className="card-title">Directions:</span>
                            {this.props.recipe.directions.map(
                                (direction, index) => (
                                    <li key={index}>
                                        {index + 1}. {direction}
                                    </li>
                                )
                            )}
                        </Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
