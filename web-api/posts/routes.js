var express = require('express');

const actions = require('./actions')

var routes = express.Router();

routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.createPost);    
// routes.put('/:id',actions.userFullUpdate);
// routes.patch('/:id',actions.userPartUpdate);
// routes.delete('/:id',actions.deleteUser);


module.exports = routes;