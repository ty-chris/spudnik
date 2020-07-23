import React from "react";

import RecipeCard from "../recipes/RecipeCard";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const PopularRecipes = ({ recipes }) => {
    let currentList = recipes;

    if (currentList && currentList.length > 3) {
        currentList = currentList
            .sort((a, b) => b.likeCount - a.likeCount)
            .slice(0, 3);
    }

    return (
        <div>
            {currentList ? (
                <div>
                    <Typography
                        variant="h6"
                        component="span"
                        align="center"
                        gutterBottom
                    >
                        <h2>Most Liked Recipes!</h2>
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        style={{ padding: 24, height: "100%" }}
                        alignItems="stretch"
                        justify="center"
                        display="flex"
                    >
                        {currentList.map((currentRecipe) => (
                            <Grid
                                key={currentRecipe.id}
                                item
                                component="Card"
                                xs={12}
                                sm={6}
                                lg={4}
                                xl={3}
                            >
                                <RecipeCard recipe={currentRecipe} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}
        </div>
    );
};

export default PopularRecipes;
