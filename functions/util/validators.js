const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
};

const isEmpty = (string) => {
    if (string.trim() === "") {
        return true;
    } else {
        return false;
    }
};

exports.validateSignUpData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Please input email address";
    } else if (!isEmail(data.email)) {
        errors.email = "Please input valid email address";
    }

    if (isEmpty(data.username)) {
        errors.handle = "Please input username";
    }

    if (isEmpty(data.password)) {
        errors.password = "Please input password";
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};
