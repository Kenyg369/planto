export const pushMock = jest.fn();
jest.mock("vue-router", () => ({
  __esModule: true,
  // eslint-disable-next-line
  // @ts-ignore 
  ...jest.requireActual("vue-router"),
  useRouter() { // eslint-disable-line
    return {
      push: pushMock
    };
  },
  useRoute() { // eslint-disable-line
    return {
      name: "deals"
    };
  }
}));
