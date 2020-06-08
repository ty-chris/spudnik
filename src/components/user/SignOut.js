import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../actions/userActions";
import Login from "./Login";
import SignUp from "./SignUp";

class SignOut extends React.Component {
    render() {
        return (
            <div>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
                <a onClick={this.props.signOut}>Log Out</a>
            </div>
        );
    }
}

export default connect(null, { signOut })(SignOut);
