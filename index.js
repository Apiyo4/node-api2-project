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
server.post('/api/posts/:id/comments', (req, res)=>{ 
    const body= req.body;
    const {id} = req.params;
     body.post_id = id;
    if(req.params.id){
        if(!req.body.text){
            res.status(400).json({errorMessage: "Please provide text for the comment." })
        }else if(req.body){
         Posts.insertComment(body)
         .then(comment=>{
             res.status(201).json(comment)
         })
         .catch(error=>{
            res.status(500).json({error: "There was an error while saving the comment to the database"})
         })   
        }

    }else{
        res.status(404).json({message: "The post with the specified ID does not exist." })
    }

})
server.get('/api/posts', (req,res)=>{
    Posts.find()
    .then(posts=>{
        console.log(posts)
    })
    .catch(error=>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })

})
server.listen(5000, ()=>{
    console.log('\n*** Server Running on http://localhost:5000 ***\n'); 
})