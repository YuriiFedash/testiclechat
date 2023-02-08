import express from "express";
import mongoose from "mongoose";
import Joi from "joi";
import logger from "pino";

import config from "./config.js";
import user from "./models/user.js";
import userService from "./services/user.js";
import validator from "./middlewares/validator.js";

const app = express();

mongoose.connect(config.databaseUrl);

const database = mongoose.connection;

database.on("error", (error) => {
  logger.info(error);
});

database.once("connected", () => {
  logger.info("Database Connected");
});

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Type + Exp");
});

app.post("/api/register", validator("register"), async (req, res) => {
  try {
    const registered = await userService.register(req.body);

    if (registered === true) {
      res.status(200).send({ message: "User created. Proceed to Login" });
    } else {
      res.status(504).send({ message: "Unknown error. Try again later" });
    }
  } catch (error) {
    const code = error instanceof Joi.ValidationError ? 420 : 500;

    res.status(code).send({ message: error.message });
  }

  //   search in existing
  //   generate id
  //   save to exisitng
  // res.send("SPASIBO BRATAN");
});

app.listen(config.port, () => {
  logger.info("Server [server] is runnging at 8000");
});
