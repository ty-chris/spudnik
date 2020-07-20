import React, { useState } from "react";
import { connect } from "react-redux";

// Theme
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

// Components
import CommentEditDialog from "./CommentEditDialog";

// Action creators
import { editComment, deleteComment } from "../actions/userActions";

const CommentMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        props.deleteComment(props.recipeId, props.commentId);
        props.onDelete();
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aira-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <CommentEditDialog
                    onClick={handleEdit}
                    editComment={props.editComment}
                    recipeId={props.recipeId}
                    commentId={props.commentId}
                    commentBody={props.commentBody}
                    commentRating={props.commentRating}
                    onEdit={props.onEdit}
                />
                <MenuItem key="delete" onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="delete" />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default connect(null, { editComment, deleteComment })(CommentMenu);
