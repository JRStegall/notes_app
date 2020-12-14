const e = require('express');
const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');

router.get('/add', ensureAuth,(req, res)=>{
    res.render('/notes/add');
})

router.post('/add', ensureAuth,async(req,res)=>{
    try{
        req.body.user = req.user._id;
        const note = await Note.create(req.body);
        res.redirect('/dsahboard');
    }catch(err){
        console.log(err);
    }
})