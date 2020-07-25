import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//theme
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AdminAssignmentDialog from "../admin/AdminAssignmentDialog";

// action creators
import { assignAsAdmin, unassignAsAdmin } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "auto",
        align: "center",
        margin: "auto",
        padding: "auto"
    },
    paper: {
        margin: "auto",
        width: "100%",
        height: "auto",
        minHeight: "60vh"
    },
    button: {
        margin: "auto"
    }
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
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Paper className={classes.paper}>
                                <Typography
                                    align="center"
                                    style={{ paddingTop: "5px" }}
                                >
                                    <h2>Admin Dashboard</h2>
                                </Typography>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={4}
                                >
                                    <Grid item>
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
                                                    color: "inherit"
                                                }}
                                            >
                                                To Admin Recipe Controls
                                            </Link>
                                        </Button>
                                    </Grid>
                                    <Grid item>
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
                                                    color: "inherit"
                                                }}
                                            >
                                                To User Submissions
                                            </Link>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <AdminAssignmentDialog
                                            action={props.assignAsAdmin}
                                            itemName={"Assign an Admin"}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <AdminAssignmentDialog
                                            action={props.unassignAsAdmin}
                                            itemName={"Unassign an Admin"}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.firebase.profile.username,
        user: state.user
    };
};

export default connect(mapStateToProps, { assignAsAdmin, unassignAsAdmin })(
    AdminDashboard
);
