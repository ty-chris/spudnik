import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SignedOutLinks = () => {
    return (
        <div>
            <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button>Sign Up</Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>Login</Button>
            </Link>
        </div>
    );
};

export default SignedOutLinks;
