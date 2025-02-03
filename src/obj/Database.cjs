const sqlite3=require('sqlite3');
const fs = require('fs');

class Database{

    constructor(db_path){
        this.db_path = db_path;
        this.exists = false;
        this.connection = null;
        
        this.Init();
    }

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

    connect() {
        this.connection = new sqlite3.Database(this.db_path, (err) =>{  
            if (err){
              console.log(err.message)
            } else {
                this.stage();
            }
        });
    }

    create() {
        if (!this.exists){
            fs.openSync(this.db_path, 'w');
        }
    }

    check() {
        this.exists = fs.existsSync(this.db_path);
        this.create();
    }

    Init() {
        this.check(); 
        this.create();
        this.connect();
    }
}

module.exports = Database; 