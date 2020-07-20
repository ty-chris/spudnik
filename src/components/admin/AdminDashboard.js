import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <Button color="primary">
                <Link
                    to={`/admin/recipes`}
                    className="item"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    To Admin RecipeList
                </Link>
            </Button>
            <Button color="primary">
                <Link
                    to={`/admin/create-recipe`}
                    className="item"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    To Admin CreateRecipe
                </Link>
            </Button>
            <Button color="primary">
                <Link
                    to={`/admin/submissions`}
                    className="item"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    To User Submissions
                </Link>
            </Button>
        </div>
    );
};

export default AdminDashboard;
