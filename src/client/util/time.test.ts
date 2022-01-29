import { getTimeString, TIME_UNITS } from "./time";

describe("time", () => {
  it("getTimeString", () => {
    expect(getTimeString(1234567890)).toBe("14 days 6.9 hours");
    expect(getTimeString(TIME_UNITS.hour / 2)).toBe("30 minutes");
    expect(getTimeString(TIME_UNITS.year * Math.PI)).toBe("3 years 51.7 days");
  });
});
