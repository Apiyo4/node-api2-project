const express = require('express');
const router = express.Router();
const Posts = require('./db');

router.post('/', (req,res)=>{
      
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
router.post('/:id/comments', (req, res)=>{ 
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
router.get('/', (req,res)=>{
    Posts.find()
    .then(posts=>{
        console.log(posts)
        res.status(200).json(posts);
    })
    .catch(error=>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })

})
router.get('/:id', (req,res)=>{
    const {id} = req.params;
    if(id){
        Posts.findById(id)
        .then(post=>{
            res.status(200).json(post);
        })
        .catch(error=>{
            res.status(500).json({ error: "The post information could not be retrieved." })
        })

    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})
router.get('/:id/comments', (req,res)=>{
    if(req.params.id){
        Posts.findPostComments(req.params.id)
        .then(com=>{
            res.status(200).json(com)
        })
        .catch(error=>{
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })

    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    if(id){
        Posts.remove(id)
        .then(post=>{
            res.status(200).send('Post was deleted')
        })
        .catch(error=>{
            res.status(400).json({ error: "The post could not be removed" })
        })

    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})
router.put('/:id', (req,res)=>{
    const {id}= req.params;
    const body = req.body;
    if(id){
        if(body){
            Posts.update(id, body)
            .then(post=>{
                res.status(200).send(`post was updated`)
            })
            .catch(error=>{
               res.status(500).json({ error: "The post information could not be modified." }) 
            })

        }else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }

    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

})
module.exports = router;