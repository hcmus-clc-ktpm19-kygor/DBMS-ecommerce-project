const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('../components/account/accountService');
const customerService = require('../components/customer/customerService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
      const user = await accountService.getByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!await accountService.validatePassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
));

passport.serializeUser(async function(user, done) {
    const customer = await customerService.get(user._id);
    done(null, {
        _id: user._id,
        username: user.username,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
    });
});

passport.deserializeUser(async function(user, done) {
    done(null, user);
});

module.exports = passport;