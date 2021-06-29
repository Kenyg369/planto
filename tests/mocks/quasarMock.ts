jest.mock("quasar", () => ({
  __esModule: true,
  // eslint-disable-next-line
  // @ts-ignore 
  ...jest.requireActual("quasar"),
  Notify: {
    create: jest.fn()
  },
}));
