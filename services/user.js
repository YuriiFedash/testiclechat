const User = require("../models/user");

const register = async (userData) => {
  const user = newUser(userData);
  const loginFound = await loginExists(userData.login);
  if (loginFound == true) {
    throw Error("such credentials are already in-use");
  }
  const userCreated = await saveNewUser(user);
  return userCreated;
  //throw Error("Error, could not create user. Try again later");
};

const newUser = (body) => {
  const user = new User({
    login: body.login,
    password: body.password,
    nickname: body.nickname,
  });
  return user;
};
const loginExists = async (login) => {
  const data = await User.findOne({ login: login });
  if (data == null) {
    return false;
  }
  return true; //{ _id: null }
};

const saveNewUser = async (user) => {
  const save = await user.save();
  console.log("new user saved", save);
  console.log(await loginExists(user.login));
  return loginExists(user.login);
};

module.exports = { register };
