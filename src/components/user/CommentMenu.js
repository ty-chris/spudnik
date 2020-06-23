import React, { useState } from "react";
import { connect } from "react-redux";

// Theme
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Components
import CommentDialog from "./CommentDialog";

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
        props.onUserAction();
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
                <CommentDialog
                    onClick={handleEdit}
                    editComment={props.editComment}
                    onUserAction={props.onUserAction}
                    recipeId={props.recipeId}
                    commentId={props.commentId}
                />
                <MenuItem key="delete" onClick={handleDelete}>
                    delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default connect(null, { editComment, deleteComment })(CommentMenu);
