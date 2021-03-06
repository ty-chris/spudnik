import React from "react";

// Theme
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

const CommentEditDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [newComment, setComment] = React.useState("");
    const [value, setValue] = React.useState(0);

    const handleClickOpen = () => {
        setComment(props.commentBody);
        setValue(props.commentRating);
        props.onClick();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleEdit = () => {
        props.editComment(props.recipeId, props.commentId, newComment, value);
        props.onEdit();
        setOpen(false);
    };

    return (
        <div>
            <MenuItem key="edit" onClick={handleClickOpen}>
                <ListItemIcon>
                    <EditRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="edit" />
            </MenuItem>
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
                        label="Edit comment"
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
                    <Button type="submit" onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CommentEditDialog;
