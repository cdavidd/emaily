const passport = require("passport");

module.exports = app => {
  //obtener info del cliente
  app.get(
    //ruta de logeo
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //direccion de retorno
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    //toma lo cookie que contiende el id y mata la id que esta alli
    req.logout();
    //res.send(req.user);
    res.redirect("/");
  });

  //req solicitud entrante
  //res respuesta saliente
  //sacamos de la cookie ?
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
