const fs = require('fs');
const path = require('path');
const { validateEmail, validateAges } = require('../helper');
const con = require("../database");

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });

};
getUser = async (req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }

    try {
        const user = await getUserQuery(userId);
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// getUser = (req, res, next) => {
//     let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
//     let users = JSON.parse(rawdata);

//     if (req.params.id == 0) {
//         var error = new Error("Id can not be 0!");
//         error.status = 401;
//         next(error);
//     }
//     let currentUser = users.filter((x) => {
//         return x.id == req.params.id;
//     });

//     res.status(200).send(currentUser[0]);
//  }
createUserQuery = (name, email, age) => {
    const query = 'INSERT INTO user (Name , Email, Age) VALUES (?,?,?)';
    return new Promise((resolve, reject) => {
        con.query(query, [name, email, age], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}
createUser = async(req, res, next) => {
    name = req.body.name;
    email = req.body.email;
    age = req.body.age;

    // let isValid = emailValidator(req.body.email);
    let isValid = validateEmail(req.body.email);
    let validUserAge = validateAges(req.body.age);
    if (!isValid) {
        var error = new Error("Email is not valid");
        error.status = 401;
        next(error);
    } else if (!validUserAge) {
        var error = new Error("You are under 18 !!! You are not authorized");
        error.status = 401;
        next(error);

    }

    else {
        try {
            var newUser = await createUserQuery(name, email, age);
            // users.push(newUser);
            res.send(newUser);

        } catch (error) {

        }
        // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
        // let users = JSON.parse(rawdata);
        // users.push(req.body);
        // let data = JSON.stringify(users);
        // fs.writeFileSync(path.join(__dirname, 'users.json'), data);
        // res.status(201).send("User has been created!");
    }

};

userFullUpdate = (req, res, next) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    const found = users.some(member => member.id == req.params.id);
    if (found) {
        users.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.id = req.body.id;
                member.name = req.body.name;
                member.surname = req.body.surname;
                member.email = req.body.email;
                member.age = req.body.age;
            }
            let data = JSON.stringify(users);
            fs.writeFileSync(path.join(__dirname, 'users.json'), data);
        })
    }
    else {
        var error = new Error("Id-to ne postoi");
        error.status = 409;
        next(error);
    }

    res.send("Full update for user with id = " + req.params.id);

}

userPartUpdate = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    const found = users.some(member => member.id == req.params.id);
    console.log(found);
    if (found) {
        users.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                console.log(member.id);
                member.name = req.body.name;
                member.surname = req.body.surname;

            }
            let data = JSON.stringify(users, null, 2);
            fs.writeFileSync(path.join(__dirname, 'users.json'), data);

        });
    }
    else {
        var error = new Error("Id-to ne postoi");
        error.status = 409;
        next(error);

    }

    res.send("Partial update for user with id = " + req.params.id);
}
deleteUser = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    const found = users.some(member => member.id === parseInt(req.params.id));
    if (found) {
        console.log(found);
        var finalList = users.filter(member => member.id !== parseInt(req.params.id));
        res.send(finalList);
    }
    else {
        res.send(`There is no user with id: ${req.params.id}`);
    }
    // res.status(400).send(finalList);

    res.send("Delete user with id = " + req.params.id);
}
module.exports = {
    getAllUsers,
    getUser, createUser, userFullUpdate, userPartUpdate, deleteUser, getAllUsersQuery
}