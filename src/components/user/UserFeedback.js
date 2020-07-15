import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";

import {
    likeRecipe,
    hasLikedRecipe,
    unlikeRecipe,
    fetchLikeCount,
    favARecipe,
    unfavARecipe,
    hasFavRecipe,
    resetState
} from "../actions/userActions";

import CommentList from "./CommentList";
import CommentPostDialog from "./CommentPostDialog";
import SimpleSnackbar from "./SimpleSnackbar";

class UserFeedback extends React.Component {
    state = {
        posted: false,
        edited: false,
        deleted: false
    };

    componentDidMount() {
        this.props.hasLikedRecipe(this.props.uid, this.props.recipeId);
        this.props.hasFavRecipe(this.props.uid, this.props.recipeId);
        this.props.fetchLikeCount(this.props.recipeId);
    }
    componentWillUnmount() {
        this.props.resetState();
    }

    handleLike = () => {
        if (this.props.uid) {
            const user = {
                uid: this.props.uid,
                username: this.props.profile.username
            };
            this.props.likeRecipe(user, this.props.recipeId);
        }
    };

    handleUnlike = () => {
        this.props.unlikeRecipe(this.props.uid, this.props.recipeId);
    };

    handleFav = () => {
        this.props.favARecipe(this.props.uid, this.props.recipeId);
    };

    handleUnfav = () => {
        this.props.unfavARecipe(this.props.uid, this.props.recipeId);
    };

    handlePost = () => {
        this.setState({ posted: true });
    };

    handleEdit = () => {
        this.setState({ edited: true });
    };

    handleDelete = () => {
        this.setState({ deleted: true });
    };

    renderLikeButton() {
        // const likeCount = !this.props.user.likeCount
        //     ? 0
        //     : this.props.user.likeCount;
        // const likes = likeCount > 1 ? "likes" : "like";
        if (this.props.user.hasLikedRecipe) {
            return (
                <Button
                    size="small"
                    color="primary"
                    onClick={this.handleUnlike}
                    startIcon={<StarRoundedIcon />}
                >
                    Unlike
                </Button>
            );
        }
        return (
            <Button
                size="small"
                color="primary"
                onClick={this.handleLike}
                startIcon={<StarBorderRoundedIcon />}
            >
                Like
            </Button>
        );
    }

    renderFavouriteButton() {
        if (this.props.user.hasFavouritedRecipe) {
            return (
                <Button
                    size="small"
                    color="primary"
                    onClick={this.handleUnfav}
                    startIcon={<FavoriteRoundedIcon />}
                >
                    Unfavourite
                </Button>
            );
        }
        return (
            <Button
                size="small"
                color="primary"
                onClick={this.handleFav}
                startIcon={<FavoriteBorderRoundedIcon />}
            >
                Favourite
            </Button>
        );
    }

    renderCommentButton() {
        return (
            <CommentPostDialog
                recipeId={this.props.recipeId}
                uid={this.props.uid}
                username={this.props.profile.username}
                onPost={this.handlePost}
            />
        );
    }

    renderLoginButton() {
        return (
            <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                    size="small"
                    color="primary"
                    startIcon={<LockOpenRoundedIcon />}
                >
                    Login to like, favourite and comment on recipe!
                </Button>
            </Link>
        );
    }

    renderSnackbar() {
        if (this.state.posted) {
            this.setState({ posted: false });
            return (
                <SimpleSnackbar
                    message={"Comment has been posted!"}
                    open={true}
                />
            );
        } else if (this.state.edited) {
            this.setState({ edited: false });
            return (
                <SimpleSnackbar
                    message={"Comment has been edited!"}
                    open={true}
                />
            );
        } else if (this.state.deleted) {
            this.setState({ deleted: false });
            return (
                <SimpleSnackbar
                    message={"Comment has been deleted!"}
                    open={true}
                />
            );
        } else {
            return;
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.uid ? (
                    <CardActions>
                        {this.renderLikeButton()}
                        {this.renderFavouriteButton()}
                        {this.renderCommentButton()}
                    </CardActions>
                ) : (
                    <CardActions>{this.renderLoginButton()}</CardActions>
                )}
                <CardContent>
                    <CommentList
                        recipeId={this.props.recipeId}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete}
                    />
                </CardContent>
                {this.renderSnackbar()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        profile: state.firebase.profile,
        user: state.user
    };
};

export default connect(mapStateToProps, {
    likeRecipe,
    hasLikedRecipe,
    unlikeRecipe,
    fetchLikeCount,
    favARecipe,
    unfavARecipe,
    hasFavRecipe,
    resetState
})(UserFeedback);
