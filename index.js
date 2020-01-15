const express = require('express');

const Posts = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.send(`testing backend for / path`)
})
server.post('/api/posts', (req,res)=>{
      
    if(req.body.title && req.body.contents){
        Posts.insert(req.body)
        .then(post=>{
         res.status(201).json(post)
        })
        .catch(error=>{
            res.status(500).json({error: "There was an error while saving the post to the database" })
        })
      
    } else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})
server.listen(5000, ()=>{
    console.log('\n*** Server Running on http://localhost:5000 ***\n'); 
})