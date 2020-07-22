import "./Welcome.css";
import React from "react";
import { Link } from "react-router-dom";

import cookingbg from "../../images/cookingbg.jpg";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    text: {
        position: "absolute",
        width: "100%",
        color: "#FFFFFF",
    },
    button: {
        position: "relative",
        paddingRight: "20px",
        paddingLeft: "20px",
    },
    wrapper: {
        position: "relative",
        width: "40%",
        margin: "auto",
        paddingTop: "20vh",
    },
    logo: {
        maxWidth: "200px",
    },
}));

const Welcome = () => {
    const classes = useStyles();
    return (
        <section
            id="welcome"
            className={classes.root}
            style={{ backgroundImage: "url(" + cookingbg + ")" }}
        >
            <div className="container valign-wrapper jc-center">
                <div className={classes.wrapper}>
                    <Grid
                        container
                        justify="flex-start"
                        spacing={8}
                        direction="column"
                    >
                        <Grid item>
                            <Grid container justify="center">
                                <img
                                    src="logo.png"
                                    alt=""
                                    className={classes.logo}
                                />
                            </Grid>
                            <Typography
                                className={classes.text}
                                align="center"
                                color="textSecondary"
                            >
                                <h2>Search, Cook, Share</h2>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.text} align="center">
                                Your go-to Cooking Platform
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                className={classes.buttonGroup}
                                container
                                justify="space-between"
                                alignItems="flex-start"
                            >
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    filled
                                    color="primary"
                                >
                                    <Link
                                        to={`/recipes`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        View our Recipes!
                                    </Link>
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    filled
                                    color="primary"
                                >
                                    <Link
                                        to={`/recipes/submit`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Contribute Recipe!
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
