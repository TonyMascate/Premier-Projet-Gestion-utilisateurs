const verifyToken = require("../Utils/functions")
const Auth = require("../Utils/Auth");
const userModel = require("../Schemas/userModel");

module.exports = (app) => {
    app.get("/api/admin", Auth, (req, res) => {
        const uncryptedToken = verifyToken(req);
        if(!uncryptedToken.user.role || uncryptedToken.user.role !== 'admin'){
            const message = "Cette ressource est réservée aux administrateurs."
            return res.status(401).json({message})
        }else{
            const message = "Bienvenue sur la page administrateur.";
            res.status(200).json({message})
        }
    })
}