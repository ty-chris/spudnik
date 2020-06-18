import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { fetchFav } from "../actions/userActions";

class Favourites extends React.Component {
    componentDidMount() {
        if (this.props.uid) {
            this.props.fetchFav(this.props.uid);
        }
    }

    renderFav() {
        console.log(this.props.recipes);
        return this.props.user.favouritedRecipes.map((recipeId, index) => {
            return (
                <ListItem key={index}>
                    <ListItemText primary={recipeId} />
                </ListItem>
            );
        });
    }

    render() {
        if (!this.props.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <List>
                <Typography>Favourites</Typography>
                {this.renderFav()}
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        user: state.user,
        recipes: state.user.favouritedRecipes
    };
};

export default connect(mapStateToProps, { fetchFav })(Favourites);
