import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const CommentDetails = (props) => {
    const { comment } = props;
    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={comment.body}
                secondary={comment.createdBy}
            />
        </ListItem>
    );
};

export default CommentDetails;
