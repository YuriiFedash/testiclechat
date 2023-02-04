const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const user = require("./models/user");
const userService = require("./services/user");
const Joi = require("joi");
const validator = require("./middlewares/validator");
const { schema } = require("./models/user");
dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Type + Exp");
});

app.post("/api/register", validator("register"), async (req, res) => {
  try {
    const registered = await userService.register(req.body);
    if (registered == true) {
      res.status(200).send({ message: "User created. Proceed to Login" });
    } else {
      res.status(504).send({ message: "Unknown error. Try again later" });
    }
  } catch (err) {
    const code = err instanceof Joi.ValidationError ? 420 : 500;
    res.status(code).send({ message: err.message });
  }
  //   search in existing
  //   generate id
  //   save to exisitng
  //res.send("SPASIBO BRATAN");
});

app.listen(port, () => {
  console.log(`Server [server] is runnging at 8000`);
});
