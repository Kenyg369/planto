export const Config = {
  // https://next.quasar.dev/style/breakpoints
  breakpoints: {
    xs: 599,
    sm: 1023,
    md: 1439,
    lg: 1919,
    xl: 1920,
  },
  minLettersToSearch: 3,
  pagination: {
    perPage: 20,
    maxPageSize: 999
  },
  env(key: string): string | boolean | undefined {
    return process.env.NODE_ENV === "test" ? process.env[key] : import.meta.env[key];
  },
  get apiDelay(): number {
    return this.env("NODE_ENV") === "test" ? 0 : 1000;
  },
  headers: {
    eTag: "etag",
    lockToken: "lock-token",
    ifMatch: "if-match"
  },
  cookies: {
    user: "planto-user"
  }
};
