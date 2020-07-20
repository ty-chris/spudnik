import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

// Theme
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import LinearProgress from "@material-ui/core/LinearProgress";

// Action creators
import { fetchFav, unfavARecipe } from "../actions/userActions";

const styles = (theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    }
});

class Favourites extends React.Component {
    componentDidMount() {
        this.props.fetchFav(this.props.uid);
        setTimeout(() => {
            this.forceUpdate();
        }, 1500);
    }

    handleUnfav = (recipeId) => {
        this.props.unfavARecipe(this.props.uid, recipeId);
        setTimeout(() => {
            this.forceUpdate();
        }, 2500);
    };

    renderRecipes() {
        const { classes } = this.props;

        if (this.props.recipes.length == 0) {
            return null;
        }

        return this.props.recipes.map((recipe) => {
            return (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={recipe.image}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {recipe.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                href={`/recipes/${recipe.id}`}
                                startIcon={<VisibilityRoundedIcon />}
                            >
                                View
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => this.handleUnfav(recipe.id)}
                                startIcon={<ThumbDownRoundedIcon />}
                            >
                                Unfavourite
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        });
    }

    render() {
        if (!this.props.uid) {
            return <Redirect to="/login" />;
        }

        const { classes } = this.props;

        if (this.props.recipes.length == 0) {
            return <LinearProgress color="secondary" />;
        } else if (this.props.recipes[0] == 0) {
            return (
                <React.Fragment>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Favourites
                            </Typography>
                            <Typography
                                component="h1"
                                variant="body1"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                <Link to="/">
                                    No favourites yet. Explore our amazing
                                    recipes here!
                                </Link>
                            </Typography>
                        </Container>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Favourites
                            </Typography>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.renderRecipes()}
                        </Grid>
                    </Container>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        recipes: state.user.favouritedRecipes
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, { fetchFav, unfavARecipe })(Favourites)
);
