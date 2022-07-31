const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = "1a2b3c4d5e"
const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const encrptedPassword = bcrypt.hashSync (password,10);

    User.create({
        username: username,
        password: encrptedPassword,
    }) .then ((data)=> {
        return res.json ({
            id: data.id,
            username: data.username,
        });
    });
}

const login = (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        where: {username: username }
    }).then ((user) => {
        if (!user) {
            return res.json({ message: 'user not found'});    
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if(!isPasswordValid){
            return res.json ({ message: 'wrong password'})
        }
        const accessToken = jwt.sign ({
            id:user.id,
            username: user.username
        }, secretKey)
 
        return res.json ({
            id:user.id,
            username: user.username,
            accessToken: accessToken,
        });
    });
};

const profile = (req,res) =>{
    const currentUser = req.user;
    return res.json({
        id: currentUser.id,
        username: currentUser.username
});
}
module.exports = {
    register,
    login,
    profile,
}