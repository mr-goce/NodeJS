var express = require('express');

const actions = require('./actions')

var routes = express.Router();

routes.get('/', actions.getAllUsers);
routes.get('/:id', actions.getUser);
routes.post('/', actions.createUser);   
routes.put('/:id',actions.userFullUpdate);
routes.patch('/:id',actions.userPartUpdate);
routes.delete('/:id',actions.deleteUser);


module.exports = routes
  
// routes.put('/:id', (req, res) => {
//     let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
//     let users = JSON.parse(rawdata);
//     const found = users.some(member => member.id == req.body.id);
//     if (!found) {
//         member.name = req.body.name;
//         member.surname = req.body.surname;
//         let data = JSON.stringify(users);
//         fs.writeFileSync(path.join(__dirname, 'users.json'), data);
//     }
//     else {
//         var error = new Error("Id-to ne postoi");
//         error.status = 409;
//         next(error);
//     }

//     res.send("Full update for user with id = " + req.params.id);
// });

// routes.patch('/:id', (req, res) => {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);
    // const found = users.some(member => member.id == req.body.id);

    // if (!found) {
    //     member.name = req.body.name;
    //     member.surname = req.body.surname;
    //     let data = JSON.stringify(users);
    //     fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    // }
    // else {
    //     var error = new Error("Id-to ne postoi");
    //     error.status = 409;
    //     next(error);

    // }
    
    // res.send("Partial update for user with id = " + req.params.id);
// });

// routes.delete('/:id', (req, res) => {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);
    // users.forEach(member =>{
    //     if(member.id == req.params.id){
    //         users.splice(users.indexOf(member),1);
    //         let data = JSON.stringify(users);
    //     fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    //     }
    // })

    // res.send("Delete user with id = " + req.params.id);
// });


