import React from "react";
import { connect } from "react-redux";

// Theme
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// Components
import Drawer from "./Drawer";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    adminOptions: {
        marginLeft: theme.spacing(1)
    }
}));

function TempAppBar(props) {
    const classes = useStyles();
    const { auth } = props;
    const links = auth.uid ? (
        <SignedInLinks className={classes.adminOptions} />
    ) : (
        <SignedOutLinks className={classes.adminOptions} />
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Drawer />
                    {links}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(TempAppBar);
