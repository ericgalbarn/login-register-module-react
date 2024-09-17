// Backend dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Run the server
app.listen(3002, () => {
  console.log("Server running on port 3002");
});

// Create MySQL connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "", //Enter your XAMPP MySQL password if any
  database: "webtest_db",
});

//  Creating a route to a server that will register a user
app.post("/register", (req, res) => {
  //  Get the variables sent from the form
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  //  Create SQL statement to insert the user to the Database table Users
  const SQL = "INSERT INTO users (email, username, password) VALUES (?,?,?)"; // We enter these values through a variable
  const Values = [sentEmail, sentUserName, sentPassword];

  //Query to execute the SQL statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User inserted successfully");
      res.send({ message: "User added!" });
      // We can see that there's a notion of new user registration in MySQL but yet to be submitted and displayed the information
      // We need to use CORS and Express
      // Successful
    }
  });
});

//  Login with these credentials from a registered user

//  Create another route
app.post("/login", (req, res) => {
  //  Get the variables sent from the form
  const sentLoginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  //  Create SQL statement to insert the user to the Database table Users
  const SQL = "SELECT * FROM users WHERE username = ? && password = ?"; // We enter these values through a variable
  const Values = [sentLoginUserName, sentLoginPassword];

  //Query to execute the SQL statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: `Credentials don't match!` });
    }
  });
});
