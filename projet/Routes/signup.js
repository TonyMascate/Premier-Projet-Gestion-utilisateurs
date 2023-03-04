const User = require("../Schemas/userModel");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/signup", (req, res) => {
    const { email, name, password } = req.body;
    console.log(name, email, password);
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ name, email, password: hash }))
      .then(user => {
        const message = "L'utilisateur a bien été créé,"
        res.status(200).json({message, data: user})
      })
      .catch(error => {
        if(error.code === 11000){
          return res.status(404).json({ message : "Cet email est associé à un compte existant." });
        }
        return res.status(500).json({ error });
      })
  });
};
