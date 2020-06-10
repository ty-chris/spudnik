import React from "react";
import { connect } from "react-redux";

// Theme
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import { postComment } from "../actions/userActions";

class CommentForm extends React.Component {
    state = { body: "" };

    handleChange = (event) => {
        this.setState({ body: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            body: this.state.body,
            commentAuthor: this.props.profile.username,
            uid: this.props.auth.uid
        };
        // to be removed
        const recipeId = "4";
        this.props.postComment(comment, recipeId);
        this.props.onSubmit();
        this.setState({ body: "" });
    };

    render() {
        return (
            <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="comment"
                            label="add a comment"
                            type="text"
                            value={this.state.body}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default connect(mapStateToProps, { postComment })(CommentForm);
