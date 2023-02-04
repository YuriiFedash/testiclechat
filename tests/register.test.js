//const { describe } = require("jest");
const register = require("../register.js");
const mockingoose = require("mockingoose");
const User = require("../models/user");
const { describe } = require("yargs");
const { default: test } = require("node:test");

//test(dsadsa, () => {});
describe("loginExists", () => {
  test("positive find", async () => {
    // arrange and act
    mockingoose(User).toReturn(
      {
        login: "yurii@hypercharge.io",
        password: "ABC123",
        nickname: "xzxz",
      },
      "findOne"
    );
    var result = await register.loginExists("yurii@hypercharge.io");
    expect(result).toBe(true);
  });
  test("negative find", async () => {
    // arrange and act
    mockingoose(User).toReturn(null, "findOne");
    var result = await register.loginExists("yurii@hypercharge.io");
    expect(result).toBe(false);
  });
});
describe("saveNewUser", () => {
  test("");
});
