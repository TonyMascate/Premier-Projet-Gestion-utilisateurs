const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = "Vous devez être authentifié pour accéder à cette ressource.";
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  
  jwt.verify(token, process.env.PRIVATE_KEY, (error, decodedToken) => {
    if (error) {
      const message = "Une erreur est survenue. (auth)";
      return res.status(401).json({ message, data: error });
    }
    const userID = decodedToken.user._id;
    if (req.body.userId && req.body.userId !== userID) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message });
    } else {
      next();
    }
  });
};
