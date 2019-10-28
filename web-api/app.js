var express = require('express');
var bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
const users = require('./users/routes');
const posts = require('./posts/routes');
require('dotenv/config');

const middleware = require('./middlewares/common');

const app = express();

app.use(middleware.logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', users);
// za posts rutata
app.use('/posts', posts);

app.use(middleware.errRoute);
app.use(middleware.errHandler);



// app.get('/read', (req, res) => {
//     let rawdata = fs.readFileSync(path.join(__dirname, 'data.json'));
//     let student = JSON.parse(rawdata);
//     res.status(200).send(student);
// });

// app.get('/write', (req, res) => {
//     let newStudent = { 
//         name: 'Mike',
//         age: 23, 
//         gender: 'Male',
//         department: 'English',
//         car: 'Honda' 
//     };

//     let data = JSON.stringify(newStudent);
//     fs.writeFileSync(path.join(__dirname, 'data.json'), data);
//     res.status(201).send(newStudent);
// });






// // user.id = updUser.id ? updUser.id : user.id;

// // if (updUser.id) {
// //     user.id = updUser.id
// // }

// app.use((req, res, next) => {
//     var error = new Error("Not found. Please try with another route!");
//     error.status = 404;
//     next(error);
// });

// app.use((err, req, res, next) => {
//     var errorObj = {
//         status: err.status,
//         error: {
//             message: err.message
//         }
//     };

//     res.status(err.status).json(errorObj);
// });

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});