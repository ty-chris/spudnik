import React from "react";
import { connect } from "react-redux";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
    likeRecipe,
    hasLikedRecipe,
    unlikeRecipe,
    favARecipe,
    unfavARecipe,
    clearFeedback,
    hasFavRecipe
} from "../actions/userActions";

import CommentList from "./CommentList";

class UserFeedback extends React.Component {
    componentDidMount() {
        this.props.hasLikedRecipe(this.props.uid, this.props.recipeId);
        this.props.hasFavRecipe(this.props.uid, this.props.recipeId);
    }
    componentWillUnmount() {
        this.props.clearFeedback();
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

    renderLikeButton() {
        if (this.props.user.hasLikedRecipe) {
            return (
                <Button
                    size="small"
                    color="primary"
                    onClick={this.handleUnlike}
                >
                    Unlike
                </Button>
            );
        }
        return (
            <Button size="small" color="primary" onClick={this.handleLike}>
                Like
            </Button>
        );
    }

    renderFavouriteButton() {
        if (this.props.user.hasFavouritedRecipe) {
            return (
                <Button size="small" color="primary" onClick={this.handleUnfav}>
                    Unfavourite
                </Button>
            );
        }
        return (
            <Button size="small" color="primary" onClick={this.handleFav}>
                Favourite
            </Button>
        );
    }

    render() {
        if (this.props.uid) {
            return (
                <React.Fragment>
                    <CardActions>
                        {this.renderLikeButton()}
                        {this.renderFavouriteButton()}
                    </CardActions>
                    <CardContent>
                        <CommentList recipeId={this.props.recipeId} />
                    </CardContent>
                </React.Fragment>
            );
        } else {
            return (
                <div>
                    <Typography>
                        Log in to like and comment on recipe!
                    </Typography>
                </div>
            );
        }
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
    favARecipe,
    unfavARecipe,
    clearFeedback,
    hasFavRecipe
})(UserFeedback);
