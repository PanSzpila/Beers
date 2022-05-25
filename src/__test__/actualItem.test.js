import reducer, { actualItemId } from "../redux/actualItem";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({ id: null });
});

test("should handle change actual item", () => {
  const previousState = { id: 997 };
  expect(reducer(previousState, actualItemId(666))).toEqual({ id: 666 });
});
