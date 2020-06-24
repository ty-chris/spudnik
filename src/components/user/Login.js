import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// Action creator
import { signIn, resetState } from "../actions/userActions";

// Theme
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const required = (value) => (value ? undefined : "Required");

const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : undefined;

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={label}
            type={type}
            {...input}
            error={touched && error}
            helperText={error}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        backgroundColor: theme.palette.secondary.main
    },
    button: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const Login = (props) => {
    // hooks equivalent of componentDidMount
    // eslint-disable
    useEffect(() => {
        props.resetState();
    }, []);
    // eslint-enable

    const classes = useStyles();
    const { handleSubmit, auth, error, signIn } = props;

    if (auth.uid) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form
                    onSubmit={handleSubmit((data) => {
                        signIn(data);
                    })}
                >
                    <Field
                        name="email"
                        type="email"
                        component={renderField}
                        label="Email"
                        validate={[required, email]}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={renderField}
                        label="Password"
                        validate={[required]}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Login
                    </Button>
                    {error ? (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    ) : null}
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/signup">
                                Don't have an account? Sign up here.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        error: state.user.error
    };
};

export default reduxForm({
    form: "login"
})(connect(mapStateToProps, { signIn, resetState })(Login));
