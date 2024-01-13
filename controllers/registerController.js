const pool = require('../db');
const bcrypt = require('bcrypt');
const userQueries = require('../queries/userQueries');

const registerNewUser = async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(userQueries.checkEmailExists, [email], (error, results) =>{
      checkForError(error);
        if(results.rows.length){
            res.status(409).json({"message":"Email already exist"});
        }
    });
    pool.query(userQueries.createNewUser, [username, email, hashedPassword], (error, results)=>{
        checkForError(error);
        res.status(201).json({"message": `User ${username} was successfully created`})
    })

    // res.status(201).json({ message: 'User registered successfully' });

}

const checkForError = (error) => {
    if(error){
        console.error(error);
        res.status(500).json({"message": "Internal server error"});
    }
}

module.exports = {registerNewUser};