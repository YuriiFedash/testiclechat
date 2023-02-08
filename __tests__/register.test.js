import * as mockingoose from "mockingoose";
import mongoose from "mongoose";
import { describe, test, expect } from "@jest/globals";
//import describe from "jest";
// import test from "node:test";

import register from "../services/user.js";
import User from "../models/user.js";

// test(dsadsa, () => {});

describe("register", () => {
  test("Register failed. User exists", async () => {
    // arrange and act
    mockingoose(User).toReturn(
      {
        login: "yurii@hypercharge.io",
        password: "ABC123",
        nickname: "xzxz",
      },
      "findOne"
    );

    // try {
    //   await register("yurii@hypercharge.io");
    // } catch (e) {
    //   expect(e.message).toBe("such credentials are already in-use");
    // }
    await expect(
      register({
        login: "yurii@hypercharge.io",
        password: "ABC123",
        nickname: "xzxz",
      })
    ).rejects.toThrow("such credentials are already in-use");
  });
  test("Register allowed. User is unique", async () => {
    // arrange and act
    mockingoose(User).toReturn(undefined, "findOne");

    expect(
      register({
        login: "yurii@hypercharge.io",
        password: "ABC123",
        nickname: "xzxz",
      })
    );
  });
});
