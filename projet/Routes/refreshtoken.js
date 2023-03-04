const jwt = require("jsonwebtoken")

module.exports = (app) => {
  app.post("/api/refreshtoken", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      const message = "Vous devez être identifié pour accéder à cette ressource.";
      return res.status(401).json({ message });
    }

    jwt.verify(token, process.env.REFRESH_KEY, (err, data) => {
      if (err) {
        const message = "Un probleme est survenu.";
        return res.status(401).json({ message });
      }
      console.log(data);
      // check en BDD si le user a toujours les droits et qu'il existe
      delete data.iat;
      delete data.exp;
      const refreshedToken = jwt.sign({ data }, process.env.PRIVATE_KEY, { expiresIn: "1800s" });
      res.status(200).json({accessToken: refreshedToken})
    });
  });
};
