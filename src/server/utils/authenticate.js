const { fetchUser, insert, fetchPassword } = require("../tables/UsersTable");
// const { compare} = require("bcryptjs");

const isValidCredentials = async (req) => {
    // console.log(req)
    const result = await fetchUser(req.body.email);
    const dbPassword = await fetchPassword(req.body.email);
    if (req.body.password == dbPassword) {
        return result;
    }
    return [];
}

const registerUser = async (req) => {
    const registered = await insert(req.body.name, req.body.email, req.body.password);
    return registered;
}

module.exports = {isValidCredentials, registerUser};