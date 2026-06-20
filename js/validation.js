function isValidEmail(email) {

    const regex =
    /^[a-zA-Z0-9._%+-]+@(edu\.)?unirio\.br$/;

    return regex.test(email);

}

function isValidPassword(password) {

    const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return regex.test(password);

}
