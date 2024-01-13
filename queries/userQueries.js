const getAllUsers = "SELECT * from users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const createNewUser = "INSERT INTO users (username, email, password) VALUES($1, $2, $3)";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const getUserByUsername = "SELECT * FROM users u WHERE u.username = $1";


module.exports = {
    getAllUsers,
    getUserById,
    checkEmailExists,
    createNewUser,
    getUserByUsername,
}