function createPool() {
  try {
    const mysql = require('mysql2');

    const pool = mysql.createPool({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Issa1233',
      database: 'mydb',
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    });
    const promisePool = pool.promise();
    
    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const pool = createPool();

module.exports = {
  connection: async () => pool.getConnection(),
  execute: (...params) => pool.execute(...params)
};


// function createPool() {
//   try {
//     const mysql = require('mysql2');

//     const pool = mysql.createPool({
//       host: 'localhost',
//       port: 3306,
//       user: 'root',
//       password: 'Csc648-team4',
//       database: 'mydb',
//       connectionLimit: 10,
//       waitForConnections: true,
//       queueLimit: 0
//     });
//     const promisePool = pool.promise();
    
//     return promisePool;
//   } catch (error) {
//     return console.log(`Could not connect - ${error}`);
//   }
// }

// const pool = createPool();

// module.exports = {
//   connection: async () => pool.getConnection(),
//   execute: (...params) => pool.execute(...params)
// };