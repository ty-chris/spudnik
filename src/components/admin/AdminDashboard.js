import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//theme
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "auto",
        align: "center",
        margin: "auto",
        padding: "auto",
    },
    paper: {
        margin: "auto",
        width: "100%",
        height: "auto",
    },
    button: {
        margin: "auto",
    },
}));

const AdminDashboard = (props) => {
    const classes = useStyles();

    // change to 404
    if (!props.user.isAdmin) {
        return null;
    }

    return (
        <div>
            {props.user.isAdmin ? (
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Paper className={classes.paper}>
                            <Typography align="center">
                                <h2>Admin Dashboard</h2>
                            </Typography>
                            <Grid
                                container
                                justify="center"
                                style={{ padding: "20px" }}
                            >
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    filled
                                    color="secondary"
                                >
                                    <Link
                                        to={`/admin/recipes`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        To Admin RecipeList
                                    </Link>
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <Link
                                        to={`/admin/create-recipe`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        To Admin CreateRecipe
                                    </Link>
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <Link
                                        to={`/admin/submissions`}
                                        className="item"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        To User Submissions
                                    </Link>
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.firebase.profile.username,
        user: state.user,
    };
};

export default connect(mapStateToProps)(AdminDashboard);
