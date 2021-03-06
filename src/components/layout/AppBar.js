import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Theme
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Components
import Drawer from "./Drawer";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {},
    title: {
        flexGrow: 1,
        textAlign: "center",
        //display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    adminOptions: {
        marginLeft: theme.spacing(1),
    },
}));

function MainAppBar(props) {
    const classes = useStyles();
    const { auth } = props;
    const links = auth.uid ? (
        <SignedInLinks className={classes.adminOptions} />
    ) : (
        <SignedOutLinks className={classes.adminOptions} />
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Drawer />
                    <Grid
                        container
                        justify="center"
                        style={{ paddingLeft: "60px" }}
                    >
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            <Link
                                to={`/`}
                                className="item"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                TheMunchingChef
                            </Link>
                        </Typography>
                    </Grid>
                    <div style={{ marginLeft: "auto", marginRight: "0" }}>
                        {links}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps)(MainAppBar);
