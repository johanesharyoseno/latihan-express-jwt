const passport = require ('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {User} = require('../models')
const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: '1a2b3c4d5e',
}

passport.use(new JwtStrategy(options, (payload, done) =>{
    User.findByPk(payload.id)
    .then(user => done (null, user))
    .catch(err=> done(err,false))
}))

module.exports = passport