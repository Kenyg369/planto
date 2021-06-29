import { mount } from "@vue/test-utils";
import Cookies from "js-cookie";

import { useAuth } from "@/composables/useAuth";
import "./VueGlobalConfig";
import { pushMock } from "./mocks/routerMock";

import App from "../src/App.vue";

const getJSONMock = jest.fn();
Cookies.getJSON = getJSONMock;

describe("App.vue", () => {
  it("load user", () => {
    getJSONMock.mockReturnValueOnce({
      id: 1,
      name: "test user",
      role: ["manager", "nonfunder"]
    });

    const { user } = useAuth();

    expect(user.value).toBeUndefined();
    mount(App, {
      shallow: true,
    });

    expect(pushMock).toHaveBeenCalledTimes(0);
    expect(user.value?.name).toBe("test user");
  });

  it("load empty user", () => {
    getJSONMock.mockReturnValueOnce(undefined);

    const { user } = useAuth();

    user.value = undefined;
    mount(App, {
      shallow: true,
    });

    expect(user.value).toBeUndefined();

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith({ name: "unauthorized" });
  });

  it("load non-manger user", () => {
    getJSONMock.mockReturnValueOnce({
      id: 1,
      name: "test user",
      role: ["nonfunder"]
    });

    const { user } = useAuth();

    user.value = undefined;

    mount(App, {
      shallow: true,
    });

    expect(user.value?.name).toBe("test user");

    expect(pushMock).toHaveBeenCalledTimes(2);
    expect(pushMock).toHaveBeenCalledWith({ name: "forbidden" });
  });
});
