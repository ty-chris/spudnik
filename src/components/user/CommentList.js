import React from "react";
import { connect } from "react-redux";

// Theme
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

// Components
import CommentDetails from "./CommentDetails";

// Action creators
import { fetchComments } from "../actions/userActions";

class CommentList extends React.Component {
    componentDidMount() {
        this.props.fetchComments(this.props.recipeId);
    }

    renderList() {
        return this.props.comments.map((comment) => {
            return (
                <React.Fragment key={comment.id}>
                    <CommentDetails
                        comment={comment}
                        onEdit={this.props.onEdit}
                        onDelete={this.props.onDelete}
                    />
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
                    {this.props.comments.length > 0 ? (
                        this.renderList()
                    ) : (
                        <Typography color="textSecondary" variant="body2">
                            Be the first to comment!
                        </Typography>
                    )}
                </List>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { comments: state.user.comments };
};

export default connect(mapStateToProps, { fetchComments })(CommentList);
