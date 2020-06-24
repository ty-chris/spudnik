import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import CommentMenu from "./CommentMenu";

// Theme
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

const CommentDetails = (props) => {
    const classes = useStyles();
    const { comment } = props;

    return (
        <React.Fragment>
            <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body1"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {comment.createdBy}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                {` ${moment(
                                    comment.createdAt.toDate()
                                ).fromNow()} ${
                                    comment.edited ? "(edited)" : ""
                                }`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={comment.body}
                />
                {props.uid === comment.uid ? (
                    <ListItemSecondaryAction>
                        <CommentMenu
                            recipeId={comment.recipeId}
                            commentId={comment.id}
                            commentBody={comment.body}
                            onUserAction={props.onUserAction}
                        />
                    </ListItemSecondaryAction>
                ) : null}
            </ListItem>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid
    };
};

export default connect(mapStateToProps)(CommentDetails);
