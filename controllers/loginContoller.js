const pool = require('../db');
const bcrypt = require('bcrypt');
const userQueries = require('../queries/userQueries');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const results = await pool.query(userQueries.getUserByUsername, [username]);

        if (results.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const user = results.rows[0];
        

        if (!user.password) {
            res.status(500).json({ message: 'Internal server error: Password hash is missing' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        checkForError(error, res);
    }
};

const checkForError = (error, res) => {
    if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
}

module.exports = { loginUser };
