// import Cookies from "js-cookie";
import { Ref, ref } from "vue";

// import { Config } from "@/config";
import { User } from "@/types/auth";

const user = ref<User | undefined>(undefined);

interface AuthComposable {
  user: Ref<User | undefined>;
  isAuthenticated: () => boolean;
  // hasRole: (role: Role) => boolean;
  loadUser: () => void;
}

export const useAuth = (): AuthComposable => {
  const isAuthenticated = (): boolean => user.value !== undefined;
  // const hasRole = (role: Role): boolean => user.value === undefined ? false : user.value.role.includes(role);

  const loadUser = (): void => {
    // const baseUser = Cookies.getJSON(Config.cookies.user);

    // user.value = baseUser === undefined ?
    user.value = {
      id: "123",
      email: "test@test.com",
      name: "test",
      firstName: "test",
      lastName: "test",
    };
  };

  // todo: implement signin/signup/signoff functions

  return {
    user,
    loadUser,
    isAuthenticated,
    // hasRole
  };
};
