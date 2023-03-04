const User = require("../Schemas/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        const message = "La combinaison email et mot de passe est incorrecte.";
        return res.status(404).json({ message });
      }
      bcrypt.compare(req.body.password, user.password).then((isPasswordValid) => {
        if (!isPasswordValid) {
          const message = "La combinaison email et mot de passe est incorrecte.";
          return res.status(401).json({ message });
        }
        const primaryToken = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: "1800s" });
        const refreshToken = jwt.sign({ user }, process.env.REFRESH_KEY, { expiresIn: "1y" });

        // user.generateTokens(primaryToken, refreshToken)

        const message = "L'utilisateur est connecté.";
        res.status(200).json({ message, data: user, Tokens: [primaryToken, refreshToken] });
      });
    });
  });
};
