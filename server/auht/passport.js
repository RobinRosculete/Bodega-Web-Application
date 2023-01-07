const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config;
const port = process.env.PORT;
const GOOGLE_CALLBACK_URL = `http://localhost:${port}/auth/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, callback) => {
      const defaultUser = {
        fullName: `${profile.name.giveName} - ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      const user = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });
      if (user && user[0]) return cb(null, user && user[0]);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

//Not completed
passport.deserializeUser((user, cb) => {
  cb(null, user);
  /*
  //Search for user in Database here
  
  const user = await User.findOne({where: {id}}).catch((err)=>{
    console.log("Error deserializing user:", user);
    cb(err, null);
  })
  console.log("Deserialized user:", user);
  if(user) cb(null, user); */
});
