import reducer, {
  resetAbvRangeTrue,
  resetAbvRangeFalse,
  resetAbvRange,
} from "../redux/resetAbvRange";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({ reset: false });
});

it("should handle state of reset properly", () => {
  const previousState = { reset: false };
  expect(reducer(previousState, resetAbvRange(true))).toEqual({ reset: true });
  expect(reducer(previousState, resetAbvRange(false))).toEqual({
    reset: false,
  });
  expect(reducer(previousState, resetAbvRangeTrue)).toEqual({ reset: true });
  expect(reducer(previousState, resetAbvRangeFalse)).toEqual({ reset: false });
});
