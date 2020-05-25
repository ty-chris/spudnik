import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const RecipeCard = ({ recipe }) => {
    console.log("current", recipe)
  return (
    <div>
      {recipe ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={recipe.image}
            title={recipe.name}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {recipe.name}
            </Typography>
            <Typography component="p">
                {recipe.details}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href="localhost:3000">
              Go to Recipe
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};

export default RecipeCard;
