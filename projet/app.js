const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const app = express();
const port = 3000;

app
.use(bodyParser.json())
.use(cors());

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
  console.log("Connecté à la base de donnée.");
}

// Import models
const users = require("./Schemas/userModel");

// Creation des routes
require("./Routes/signup")(app);
require("./Routes/login")(app);
require("./Routes/me")(app);
require("./Routes/admin")(app);
require("./Routes/refreshtoken")(app);

app.listen(port, () => {
  console.log("Application démarrée avec succés.");
});
