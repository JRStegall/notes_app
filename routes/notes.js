const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');