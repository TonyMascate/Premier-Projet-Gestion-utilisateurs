const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req) {
    const authorizationHeader = req.headers.authorization;

    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    const uncryptedToken = jwt.verify(token, process.env.PRIVATE_KEY, (error, decodedToken) => {
      if (error) {
        const message = "Une erreur est survenue.";
        res.status(401).json({ message, data: error });
      }
      return decodedToken;
    });
    return uncryptedToken;
}