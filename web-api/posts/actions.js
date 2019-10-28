const fs = require('fs');
const path = require('path');
// const { validateEmail, validateAges } = require('../helper');
const con = require("../database");

getAllPostsQuery = () => {
    const query = 'SELECT * FROM posts';
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

getAllPosts = async (req, res) => {
    try {
        const users = await getAllPostsQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getSpecificPostQuery = (postId) => {
    const query = 'SELECT * FROM posts WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });

};
getSpecificPost = async (req, res, next) => {
    const postId = req.params.id;

    if (postId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }

    try {
        const post = await getSpecificPostQuery(postId);
        res.status(200).send(post[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPostQuery = ( text, likes) => {
    const query = 'INSERT INTO posts ( text, likes, createdOn) VALUES (?,?, now())';
    return new Promise((resolve, reject) => {
        con.query(query, [text, likes], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}
createPost = async(req, res, next) => {
    text = req.body.text;
    likes = req.body.likes;


    // let isValid = emailValidator(req.body.email);
    // let isValid = validateEmail(req.body.email);
    // let validUserAge = validateAges(req.body.age);
    // if (!isValid) {
    //     var error = new Error("Email is not valid");
    //     error.status = 401;
    //     next(error);
    // } else if (!validUserAge) {
    //     var error = new Error("You are under 18 !!! You are not authorized");
    //     error.status = 401;
    //     next(error);

    // }

    
        try {
            var newUser = await createPostQuery(text, likes);
            // users.push(newUser);
            res.send(newUser);

        } catch (error) {

        }
       


};



module.exports ={getAllPosts,getSpecificPost, createPost};