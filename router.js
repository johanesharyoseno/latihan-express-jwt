const router = require('express').Router();

const { Router } = require('express');
const auth = require('./controllers/auth-controllers');
const restrict = require ('./middlewares/restrict')
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/profile', restrict, auth.profile)
module.exports = router;