import React from "react";
import { connect } from "react-redux";

// Theme
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";

import { postComment } from "../actions/userActions";

const CommentPostDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [newComment, setComment] = React.useState("");

    const handleClickOpen = () => {
        setComment("");
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
            uid: props.uid
        };
        props.postComment(comment, props.recipeId);
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New comment"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={newComment}
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
