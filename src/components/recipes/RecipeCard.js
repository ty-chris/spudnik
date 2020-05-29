import React from "react";
import { Link } from "react-router-dom";

// Theme
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const RecipeCard = ({ recipe }) => {
    console.log("current", recipe);
    return (
        // todo make cards same height/overflow description to 2 lines
        <div>
            {recipe ? (
                <Card style={{ height: "auto" }}>
                    <CardMedia
                        style={{ height: 0, paddingTop: "56.25%" }}
                        image={recipe.image}
                        title={recipe.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            {recipe.name}
                        </Typography>
                        <Typography component="p">{recipe.details}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            <Link to="/" className="item">
                                Go to Recipe
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    );
};

export default RecipeCard;
