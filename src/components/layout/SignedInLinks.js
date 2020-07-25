import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// theme
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// actions
import {
    signOut,
    assignAsAdmin,
    unassignAsAdmin
} from "../actions/userActions";

// components
import AdminAssignmentDialog from "../admin/AdminAssignmentDialog";

const SignedInLinks = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOutClick = () => {
        props.signOut();
    };

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>{props.username}</MenuItem>
                {props.user.isAdmin ? (
                    <React.Fragment>
                        <MenuItem
                            component={Link}
                            to="/admin/"
                            onClick={handleClose}
                        >
                            Admin console
                        </MenuItem>
                    </React.Fragment>
                ) : null}
                <MenuItem
                    component={Link}
                    to="/favourites"
                    onClick={handleClose}
                >
                    View Favourites
                </MenuItem>
                <MenuItem onClick={handleSignOutClick}>Sign Out</MenuItem>
            </Menu>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.firebase.profile.username,
        user: state.user
    };
};

export default connect(mapStateToProps, {
    signOut,
    assignAsAdmin,
    unassignAsAdmin
})(SignedInLinks);
