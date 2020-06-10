import React from "react";
import { connect } from "react-redux";

// Theme
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

// Components
import CommentDetails from "./CommentDetails";
import CommentForm from "./CommentForm";
import { fetchComments } from "../actions/userActions";

class CommentList extends React.Component {
    componentDidMount() {
        // to be removed
        const recipeId = "4";
        this.props.fetchComments(recipeId);
    }

    handleSubmit = () => {
        // to be removed
        const recipeId = "4";
        this.props.fetchComments(recipeId);
    };

    renderList() {
        return this.props.comments.map((comment) => {
            return (
                <React.Fragment key={comment.id}>
                    <CommentDetails comment={comment} />
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <Container fixed>
                <List>
                    <Typography>Comments</Typography>
                    {this.renderList()}
                </List>
                <CommentForm onSubmit={this.handleSubmit} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { comments: state.user.comments };
};

export default connect(mapStateToProps, { fetchComments })(CommentList);