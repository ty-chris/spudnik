import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../actions/userActions";

// Theme
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
    form: {
        textAlign: "center"
    },
    pageTitle: {
        margin: 20
    },
    textField: {
        margin: 5
    },
    button: {
        margin: 20
    }
};

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, auth, error } = this.props;
        if (auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Welcome back!
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Login
                        </Button>
                        {error ? <p>{error}</p> : null}
                        <br />
                        <small>
                            Don't have an account? Sign up{" "}
                            <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        error: state.user.error
    };
};

export default connect(mapStateToProps, { signIn })(withStyles(styles)(Login));
