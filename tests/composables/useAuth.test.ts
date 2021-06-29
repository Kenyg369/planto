import Cookies from "js-cookie";

import { useAuth } from "@/composables/useAuth";
import { Role } from "@/types/auth";

const getJSONMock = jest.fn();
Cookies.getJSON = getJSONMock;

describe("useAuth composable", () => {
  getJSONMock.mockReturnValueOnce({
    id: 1,
    name: "test user",
    role: ["manager", "nonfunder"]
  });

  const { user, loadUser, isAuthenticated, hasRole } = useAuth();

  it("load user", () => {
    expect(user.value).toBe(undefined);
    expect(isAuthenticated()).toBe(false);
    expect(hasRole(Role.Manager)).toBe(false);

    loadUser();

    expect(user.value.name).toEqual("test user");

    expect(isAuthenticated()).toBe(true);

    expect(hasRole(Role.Funder)).toBe(false);
    expect(hasRole(Role.Manager)).toBe(true);
    expect(hasRole(Role.NonFunder)).toBe(true);
  });
});
