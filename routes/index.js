const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');

router.get('/',ensureGuest,(req, res)=>{
    res.render('login', {
        layout: 'login'
    });
})

router.get('/dashboard', ensureAuth, async (req, res)=>{
    try {
        const notes = await Note.find({}).lean();
    res.render('dashboard', {name : req.user.firstName});
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;