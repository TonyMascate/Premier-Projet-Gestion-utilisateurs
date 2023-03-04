const Auth = require("../Utils/Auth");
const verifyToken  = require("../Utils/functions");

module.exports = (app) => {
  app.get("/api/me", Auth, (req, res) => {
    const uncryptedToken = verifyToken(req)
    res.status(200).json({data: uncryptedToken})
  });
};
