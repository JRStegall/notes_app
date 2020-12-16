const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');

router.get('/add',ensureAuth,(req, res)=>{
    res.render('notes/add');
});

router.post('/add', ensureAuth, async(req,res)=>{
    try{
        req.body.user = req.user._id;
        const note = await Note.create(req.body);
        res.redirect('/dashboard');
    }catch(err){
        console.log(err);
    }
});

router.get('./:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).lean();
        console.log(note);
        res.render('notes/read', { note });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;