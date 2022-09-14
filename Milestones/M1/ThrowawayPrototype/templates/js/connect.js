let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'csc648-team4.cwpgbxyiuu7u.us-west-1.rds.amazonaws.com',
    port:'3306',
    user: 'admin',
    password: 'password',
    database: 'todoapp'
});


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });


