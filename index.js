const express = require('express');


//import router
const router = require ('./router');
const passport = require('./lib/passport');
const port = process.env.port || 3000;

const app = express ();
app.use (express.json());
app.use (passport.initialize());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(router)

app.listen(port, ()=>{
    console.log('server is running')
})