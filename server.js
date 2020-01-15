const express = require('express');

const post_router = require('./data/posts-router') 
const server = express();

server.use(express.json());
server.use('/api/posts', post_router)

server.get('/', (req, res)=>{
    res.send(`testing backend for / path`)
})


module.exports = server;