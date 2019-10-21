const fs = require('fs');
const path = require('path');


getAllUsers=(req,res) => {
let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
let users = JSON.parse(rawdata);
res.status(200).send(users); 
}
getUser =(req,res,next)=>{
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    if (req.params.id == 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }
    let currentUser = users.filter((x) => {
        return x.id == req.params.id;
    });

    res.status(200).send(currentUser[0]);
}

createUser=(req,res)=>{
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    users.forEach(member => {
        if (member.id == req.body.id) {
            var error = new Error("id already exist");
            error.status = 409;
            next(error);
        }
        else {
            users.push(req.body);
            let data = JSON.stringify(users);
            fs.writeFileSync(path.join(__dirname, 'users.json'), data);

        }
    })
}
userFullUpdate=(req,res)=>{
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    const found = users.some(member => member.id == req.body.id);
    if (!found) {
        member.name = req.body.name;
        member.surname = req.body.surname;
        let data = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    }
    else {
        var error = new Error("Id-to ne postoi");
        error.status = 409;
        next(error);
    }

    res.send("Full update for user with id = " + req.params.id);

}

userPartUpdate =(req,res)=>{
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    const found = users.some(member => member.id == req.body.id);

    if (!found) {
        member.name = req.body.name;
        member.surname = req.body.surname;
        let data = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    }
    else {
        var error = new Error("Id-to ne postoi");
        error.status = 409;
        next(error);

    }
    
    res.send("Partial update for user with id = " + req.params.id);
}
deleteUser=()=>{
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    users.forEach(member =>{
        if(member.id == req.params.id){
            users.splice(users.indexOf(member),1);
            let data = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, 'users.json'), data);
        }
    })

    res.send("Delete user with id = " + req.params.id);
}
module.exports={getAllUsers,
    getUser,createUser,userFullUpdate,userPartUpdate,deleteUser}