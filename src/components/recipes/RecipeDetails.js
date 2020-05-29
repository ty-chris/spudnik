import React from "react";
import { connect } from "react-redux";

const RecipeDetails = (props) => {
    console.log(this.props.recipe);
    return <div>details</div>;
};

const mapStateToProps = (state) => {
    //console.log("state", state);
    return {
        recipes: state.recipes,
        recipe: state.selectedRecipe,
        id: state.selectedRecipe.id,
    };
};

export default connect(mapStateToProps)(RecipeDetails);
