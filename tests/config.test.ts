import { Config } from "@/config";

describe("config.ts", () => {
  it("env", () => {
    // current process.env.NODE_ENV is test
    expect(Config.env("NODE_ENV")).toBe("test");
    expect(Config.env("TEST_ENV_UTILS")).toBe(undefined);

    process.env.TEST_ENV_UTILS = "testing";
    expect(Config.env("TEST_ENV_UTILS")).toBe("testing");

    process.env.NODE_ENV = "dev";
    expect(Config.env("TEST_ENV_UTILS")).toBe("testing");
    process.env.NODE_ENV = "test";
  });
});
