import mockingoose from "mockingoose";
import { describe, test, expect } from "@jest/globals";
//import describe from "jest";
// import test from "node:test";

import register from "../services/user.js";
import User from "../models/user.js";

// test(dsadsa, () => {});

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

    const result = await register.loginExists("yurii@hypercharge.io");

    expect(result).toBe(true);
  });
  test("negative find", async () => {
    // arrange and act
    mockingoose(User).toReturn(undefined, "findOne");

    const result = await register.loginExists("yurii@hypercharge.io");

    expect(result).toBe(false);
  });
});
