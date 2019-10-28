
 require('dotenv/config');
var mysql = require('mysql');


var connection = mysql.createConnection({
  // host     : "localhost",
  // user     : "goce",
  // password : "GOCEgoce90",
  // database : "code_academy_a2",
  // port : process.env.MYSQL_PORT
  host     : process.env.MYSQL_HOSTNAME,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port : process.env.MYSQL_PORT
});
 
connection.connect((error) => {
if (error) {
  console.log('Problem with DB connection : ' + error.message);
} else {
  console.log('DB connected!');
}
});

module.exports = connection;