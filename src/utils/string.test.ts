import { toUrl } from "./string";
describe("String utils", () => {
  it("transforms text into url string", () => {
    const result = toUrl("this is a Test Url String");
    expect(result).toBe("this-is-a-test-url-string");
  });
});
