const db = require('../Services/database.js');

const addUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, email)
                     VALUES (?, ?)`;
        db.run(sql, [name, email], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM users`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

const authenticateUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM users
                     WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

module.exports = {
    addUser,
    getUsers,
    authenticateUser
};