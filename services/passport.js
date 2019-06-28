const passsport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//id de mongo
//cookie para el usuario
//id <= instancia de modelo
passsport.serializeUser((user, done) => {
  done(null, user.id);
});

//sacar al usuario de la cookie
//id => instancia de modelo
passsport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
// console.developers.google.com
//requisitos para obtener la direccion
passsport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //ruta de devolucion de info
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log("access Token", accessToken);
      //console.log("refresh Token", refreshToken);
      //console.log("profile", profile);
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //Ya tenemos un registro con el ID de perfil dado
        return done(null, existingUser);
      }
      //no tenemos un registro con el ID de perfil dado, crea un nuevo registro
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
