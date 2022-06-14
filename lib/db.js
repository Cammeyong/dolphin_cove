var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2018@Camelious2",
    database: "dolphin_cove"
});

conn.connect((err)=> {
    if(!err)
        console.log('Conneted to database...Blessings');
    else
        console.log('Connection failed!' + JSON.stringify(err, undefined,2));
});

module.exports = conn;