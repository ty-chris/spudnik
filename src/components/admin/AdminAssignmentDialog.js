import React from "react";

// Theme
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";

const AdminAssignmentDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleClickOpen = () => {
        props.onClick();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        props.action(email);
        setOpen(false);
    };

    return (
        <div>
            <MenuItem key={props.itemName} onClick={handleClickOpen}>
                {props.itemName}
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
                        id="email"
                        label="Enter user's email"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                        value={email}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminAssignmentDialog;
