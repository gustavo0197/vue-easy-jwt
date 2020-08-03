const { VueEasyJwt } = require("../.build");
const jwt = new VueEasyJwt();
// This is a valid token
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VzdGF2byIsImlhdCI6MTU5NjQwODI1OSwiZXhwIjo0NzUyMTY4MjU5fQ.ThwsJW2KfMTl0y24tTGWKHqvYWRp1iyo_Kh2KWTHuXc";
// This is an expired token
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MjYyMzkwMjJ9.GMdV0dx1F8rZuHUebeXL5tR2DROlc03IuDc2DeDTExI";

test("Decode a valid token", () => {
  const decodedToken = jwt.decodeToken(validToken);
  expect(decodedToken.name).toBe("Gustavo");
});

test("Is valid? No expired token", () => {
  expect(jwt.isExpired(validToken)).toBe(false);
});

test("Is valid? Expired token", () => {
  expect(jwt.isExpired(expiredToken)).toBe(true);
});

test("Decode and isExpired? for empty string", () => {
  expect(jwt.isExpired("")).toBe(true);
  expect(jwt.decodeToken("")).toBe(null);
});

test("Is expired? Undefined and null tokens", () => {
  expect(jwt.isExpired(undefined)).toBe(true);
  expect(jwt.isExpired(null)).toBe(true);
});

test("decodeToken() Undefined and null tokens", () => {
  expect(jwt.decodeToken(undefined)).toBe(null);
  expect(jwt.decodeToken(null)).toBe(null);
});

test("getToken function. A function was not set", () => {
  expect(jwt.getToken()).toBe(null);
});

test("getToken function. A function was set", () => {
  jwt.defaultTokenGetter(() => "some token");
  expect(jwt.getToken()).toBe("some token");
});
