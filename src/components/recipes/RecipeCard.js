import React from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

import RecipeDetails from "./RecipeDetails";

// Theme
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

const RecipeCard = ({ recipe }) => {
    //console.log("current", recipe);
    return (
        // todo make cards same height/overflow description to 2 lines
        <div>
            {recipe ? (
                <Link
                    to={`/recipes/${recipe.id}`}
                    className="item"
                    style={{ textDecoration: "none" }}
                >
                    <Card style={{ height: "100%" }}>
                        <CardActionArea>
                            {recipe.image ? (
                                <CardMedia
                                    style={{ height: 0, paddingTop: "56.25%" }}
                                    image={recipe.image}
                                    title={recipe.name}
                                />
                            ) : (
                                <LinearProgress color="secondary" />
                            )}

                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="h2"
                                    noWrap
                                >
                                    {recipe.name}
                                </Typography>
                                <Typography component="p">
                                    {recipe.details}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            ) : null}

            <Route path={`/recipes/:recipeId`} component={RecipeDetails} />
        </div>
    );
};

const mapStateToProps = (state) => {
    //console.log("state from card", state);
    return {
        recipes: state.recipes,
    };
};

export default connect(mapStateToProps)(RecipeCard);
