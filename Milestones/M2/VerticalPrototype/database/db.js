let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'csc648-team4.cwpgbxyiuu7u.us-west-1.rds.amazonaws.com',
    port:'3306',
    user: 'admin',
    password: 'password',
    database: "landlord-app",
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.\n');
  });
  

  module.exports = connection.promise();