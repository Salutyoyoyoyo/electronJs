const sqlite3 = require('sqlite3').verbose();
const path = require('node:path');

const dbPath = path.join(__dirname, 'my-database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error('Erreur lors de la connexion à la base de données:', err.message);
    }
    console.log('Connecté à la base de données SQLite.');
});

const initializeDatabase = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)', (err) => {
            if (err) {
                return console.error('Erreur lors de la création de la table:', err.message);
            }
            console.log('Table "users" prête.');
        })
    })
}

initializeDatabase();

module.exports = db;