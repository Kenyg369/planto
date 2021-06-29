export const tMock = jest.fn();
jest.mock("vue-i18n", () => ({
  __esModule: true,
  // eslint-disable-next-line
  // @ts-ignore 
  ...jest.requireActual("vue-i18n"),
  useI18n() { // eslint-disable-line
    return {
      t: tMock
    };
  },
}));
