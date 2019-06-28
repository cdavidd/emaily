const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");
mongoose.connect(keys.mongoURI);
//una aplicacion  express, para  la configuración que escuchará las solicitudes entrantes que se están enrutando hacia
//el lado Express de la salida desde el lado del nodo y luego enrutará esas solicitudes
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
//middleware
//inicializar modulo de autenticacion
app.use(passport.initialize());
//altera el objeto de solicitud y cambia el valor de 'usuario' que actualmente es el ID de sesión (de la cookie del cliente) al objeto de usuario deserializado verdadero
app.use(passport.session());

require("./routes/authRoutes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//localhost:5000
//npm run dev
//
