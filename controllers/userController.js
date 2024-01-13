const pool = require('../db');
const userQueries = require('../queries/userQueries');

const getAllUsers = (req, res) => {
    pool.query(userQueries.getAllUsers, (error, results) => {
        if(error){
            console.error(error);
            res.status(500).json({error:"Internal Server Error"});
        }
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(userQueries.getUserById, [id], (error, results) => {
        if(error){
            console.error(error);
            res.status(500).json({error:"Internal Server Error"});
        }
        res.status(200).json(results.rows);

    })
}

module.exports = {
    getAllUsers,
    getUserById,
}