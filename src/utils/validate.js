export const checkValidData = (email,password,name) => {
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    // const isNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);

    if(!isEmailValid) return "Email ID not valid";
    if(!isPasswordValid) return "Password not valid";
    // if(!isNameValid) return "Not a valid Name";

    return null;
}