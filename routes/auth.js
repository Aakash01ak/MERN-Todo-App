const express = require('express')
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation')
const jwt = require("jsonwebtoken")


// REGISTER
router.post('/register', async (req,res) => {

        // Lets validate the data of user
        const {error} =  registerValidation(req.body);
        if(error) return res.status(400).json({ msg : error.details[0].message})

        //checking if user is already in the database
        const duplicateEmail = await User.findOne({ email: req.body.email});
        if(duplicateEmail) return res.status(400).json({ msg: "Email already in use"});

        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save();
        res.json({ user: user.name});
    }
      catch(err){
          res.status(400).json(err);
      }
})

// LOGIN
router.post('/login', async (req,res) => {

     // Lets validate the data of user
     const {error} =  loginValidation(req.body);
     if(error) return res.status(400).json({ msg: error.details[0].message})

     //checking if email exists
     const user = await User.findOne({ email: req.body.email});
    //  if(!user) return res.status(400).send("You are not registered")
     if(!user) return res.status(400).json({msg : "You are not registered"})

     //checking if password is correct
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).json({ msg: "Wrong password"})

     //Create and assign a token
     const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 3600} );
     res.header('Authentication', token).send(token);
})

module.exports = router