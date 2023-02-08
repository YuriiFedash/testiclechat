import logger from "pino";

import User from "../models/user.js";

function newUser(body) {
  return new User({
    login: body.login,
    password: body.password,
    nickname: body.nickname,
  });
}

async function loginExists(login) {
  const data = await User.findOne({ login });

  return Boolean(data);

  // { _id: null }
}

async function saveNewUser(user) {
  const save = await user.save();

  logger().info("new user saved", save);
  logger().info(await loginExists(user.login));

  return loginExists(user.login);
}

async function register(userData) {
  const user = newUser(userData);
  const loginFound = await loginExists(userData.login);

  if (loginFound === true) {
    throw new Error("such credentials are already in-use");
  }

  return saveNewUser(user);

  // throw Error("Error, could not create user. Try again later");
}

export default register;
