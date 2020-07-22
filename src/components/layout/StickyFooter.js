import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="localhost:3000">
                TheMunchingChef
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(1),
        alignItems: "center",
    },
    footer: {
        padding: theme.spacing(2, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },
    logo: {
        maxWidth: "60px",
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer}>
                <Grid container justify="center">
                    <img src="logo.png" alt="" className={classes.logo} />
                </Grid>
                <Typography variant="body1" align="center">
                    Your go-to Cooking Platform.
                </Typography>
                <Copyright />
            </footer>
        </div>
    );
}
