const express = require('express');
const router = express.Router();
const Todo = require("../models/Todos")
const verify = require('./verifyToken_privateRoute')

//Getting all Todos

router.get('/', verify, async (req,res) =>{
    // Todo.find()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     message: err
    // })
    try{
       const todos = await Todo.find()
       .sort({ date: -1 })
       res.status(200).json(todos)
    }
    catch(err){
      res.status(400).json({message: err})
    }
})

// Posting a todo

router.post('/',verify, async (req,res) =>{
    const todo = new Todo({
        name: req.body.name
    })
    // todo.save()
    // .then(data => {
    //     res.status(200).json(todo)
    // })
    // .catch(err => {
    //     message: err
    // })
    try{
        const savedTodo = await todo.save()
        res.status(200).json(savedTodo)
    }
    catch(err){
        res.status(400).json({ message: err })
    }
})

//Specific Todo

// router.get('/:id', async (req,res) =>{
//     try{
//     const todo = await Todo.findById(req.params.id)
//     res.status(200).json(todo)
//     }
//     catch(err){
//       res.status(400).json({
//           message: err
//       })
//     }
// })

//Delete Todo

router.delete("/:id",verify, async (req,res) => {
    try{
    const removedTodo = await Todo.deleteOne({_id: req.params.id})
    res.status(200).json(removedTodo)
    }
    catch(err){
        res.status(400).json({
            message: err
        })
      }
})

// Update Todo

// router.patch('/:id', async (req,res) => {
//     try{
//         const updatedTodo = await Todo.updateOne(
//             { _id: req.params.id},
//             { $set : {name : req.body.name}
//         })
//         res.status(200).json(updatedTodo)
//     }
//     catch(err){
//         res.status(400).json({
//             message: err
//         })
//     }
// })

module.exports = router;