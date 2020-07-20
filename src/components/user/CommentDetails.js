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
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";

import { adminDeleteComment } from "../actions/userActions";

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
    const createdAt = new Date(comment.createdAt.seconds * 1000);

    const handleAdminDelete = () => {
        props.adminDeleteComment(comment.recipeId, comment.id);
    };

    const renderComment = () => {
        if (comment.deletedByAdmin) {
            return (
                <ListItem key={comment.id} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <ErrorOutlineRoundedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                {` ${moment(createdAt).fromNow()} ${
                                    comment.edited ? "(edited)" : ""
                                }`}
                            </Typography>
                        }
                        secondary={"Comment has been removed by the admin"}
                    />
                </ListItem>
            );
        } else {
            return (
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
                                    {` ${moment(createdAt).fromNow()} ${
                                        comment.edited ? "(edited)" : ""
                                    }`}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Rating
                                    readOnly
                                    value={comment.rating}
                                    size="small"
                                />
                                <Typography>{comment.body}</Typography>
                            </React.Fragment>
                        }
                    />
                    {renderCommentOptions()}
                </ListItem>
            );
        }
    };

    const renderCommentOptions = () => {
        if (props.uid === comment.uid) {
            return (
                <ListItemSecondaryAction>
                    <CommentMenu
                        recipeId={comment.recipeId}
                        commentId={comment.id}
                        commentBody={comment.body}
                        commentRating={comment.rating}
                        onEdit={props.onEdit}
                        onDelete={props.onDelete}
                    />
                </ListItemSecondaryAction>
            );
        } else if (props.isAdmin) {
            return (
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="more"
                        aira-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleAdminDelete}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            );
        } else {
            return;
        }
    };

    return <React.Fragment>{renderComment()}</React.Fragment>;
};

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        isAdmin: state.user.isAdmin
    };
};

export default connect(mapStateToProps, { adminDeleteComment })(CommentDetails);
