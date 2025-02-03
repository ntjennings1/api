// Imports
const sqlite3=require('sqlite3');
const fs = require('fs');

/**
 * Class representation of a Database.
 */
class Database{

    /**
     * Create a database.
     * @param {string} db_path - The path to the integrated database file.
     */
    constructor(db_path){
        this.db_path = db_path;
        this.exists = false;
        this.connection = null;
        
        this.Init();
    }

    /**
     * Stages the data in the database.
     */
    stage() {
        this.connection.run('DROP TABLE IF EXISTS users', (err) => {
            if (err){
                console.log(err.message);
            } else {
                this.connection.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)', (err) =>{
                    if (err){
                        console.log(err.message);
                    }
                    else{
                        console.log('DB Staged');
                    }
                });
            }
        });   
    }

    /**
     * Connects the database to an SQLite3 Database.
     */
    connect() {
        this.connection = new sqlite3.Database(this.db_path, (err) =>{  
            if (err){
              console.log(err.message)
            } else {
                this.stage();
            }
        });
    }

    /**
     * Creates the database file at the path.
     */
    create() {
        if (!this.exists){
            fs.openSync(this.db_path, 'w');
        }
    }

    /**
     * Checks for the existence of the database at its path.
     */
    check() {
        this.exists = fs.existsSync(this.db_path);
        this.create();
    }

    /**
     * Checks if the database exists, creates one if not, connects it to imported strucutre, and stages the data.  
     */
    Init() {
        this.check(); 
        this.create();
        this.connect();
    }
}

module.exports = Database; 