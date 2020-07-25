import React from "react";
import { connect } from "react-redux";

import { getRecipesThunk } from "../actions/recipeActions";

import { withStyles } from "@material-ui/core/styles";
import Welcome from "./Welcome";
import LatestRecipes from "./LatestRecipes";
import PopularRecipes from "./PopularRecipes";

const useStyles = (theme) => ({});

class LandingPage extends React.Component {
    componentDidMount() {
        if (!this.props.recipe) {
            this.props.getRecipesThunk();
        }
    }

    render() {
        return (
            <div>
                {(this.props.recipes && this.props.recipes.length) > 0 ? (
                    <div>
                        <Welcome />
                        <LatestRecipes recipes={this.props.recipes} />
                        <PopularRecipes recipes={this.props.recipes} />
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("state from list", state);
    return {
        recipes: state.recipes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesThunk: () => dispatch(getRecipesThunk()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(LandingPage));
