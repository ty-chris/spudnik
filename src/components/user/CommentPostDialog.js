import React from "react";
import { connect } from "react-redux";

// Theme
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// Action creators
import { postComment } from "../actions/userActions";

import SimpleSnackbar from "./SimpleSnackbar";

const CommentPostDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [newComment, setComment] = React.useState("");
    const [value, setValue] = React.useState(0);

    const handleClickOpen = () => {
        setComment("");
        setValue(0);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handlePost = () => {
        const comment = {
            body: newComment,
            createdBy: props.username,
            uid: props.uid,
            value: value
        };
        props.postComment(comment, props.recipeId);
        props.onPost();
        setOpen(false);
    };

    return (
        <div>
            <Button
                size="small"
                color="primary"
                onClick={handleClickOpen}
                startIcon={<CommentRoundedIcon />}
            >
                Comment
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <Typography component="legend">
                        Rate this Recipe!
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New comment"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={newComment}
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handlePost} color="primary">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default connect(null, { postComment })(CommentPostDialog);
