import React from "react";

// Theme
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";

const CommentDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [newComment, setComment] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleEdit = () => {
        props.editComment(props.recipeId, props.commentId, newComment);
        props.onUserAction();
        setOpen(false);
        props.onClick();
    };

    return (
        <div>
            <MenuItem key="edit" onClick={handleClickOpen}>
                edit
            </MenuItem>
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
                    <Button type="submit" onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CommentDialog;
