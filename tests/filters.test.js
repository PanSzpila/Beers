import reducer, {
  changeFilterPage,
  changeFilterPageIncrement,
  changeFilterPageDecrement,
  changeFilterPer_page,
  changeFilterAbv_gt,
  changeFilterAbv_lt,
  changeFilterBeer_name,
  changeFilterBrewed_before,
  changeFilterBrewed_after,
  changeFilterMalt,
  changeFilterFood,
  resetFilters,
} from "../src/redux/filters";

const initialState = {
  page: 1,
  per_page: 25,
  abv_gt: null,
  abv_lt: null,
  beer_name: null,
  brewed_before: null,
  brewed_after: null,
  malt: null,
  food: null,
};

const previousState = {
  page: 5,
  per_page: 25,
  abv_gt: 2.2,
  abv_lt: 8.7,
  beer_name: "Pale Ale",
  brewed_before: "06-2013",
  brewed_after: "02-2001",
  malt: "Maris Otter Extra Pale",
  food: "rice",
};

it("returns the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

describe("handle filters changes properly", () => {
  it("changes page to specific number", () => {
    expect(reducer(previousState, changeFilterPage(7))).toEqual({
      ...previousState,
      page: 7,
    });
  });
  it("increments page number", () => {
    expect(reducer(previousState, changeFilterPageIncrement())).toEqual({
      ...previousState,
      page: 6,
    });
  });
  it("decrements page number", () => {
    expect(reducer(previousState, changeFilterPageDecrement())).toEqual({
      ...previousState,
      page: 4,
    });
  });

  it("changes number of items per page to display", () => {
    expect(reducer(previousState, changeFilterPer_page(50))).toEqual({
      ...previousState,
      per_page: 50,
    });
  });
  it("changes FilterAbv_gt", () => {
    expect(reducer(previousState, changeFilterAbv_gt(3.3))).toEqual({
      ...previousState,
      abv_gt: 3.3,
    });
  });
  it("changes FilterAbv_lt", () => {
    expect(reducer(previousState, changeFilterAbv_lt(7.2))).toEqual({
      ...previousState,
      abv_lt: 7.2,
    });
  });
  it("changes beer_name filter", () => {
    expect(
      reducer(previousState, changeFilterBeer_name("TestOfBeerName"))
    ).toEqual({
      ...previousState,
      beer_name: "TestOfBeerName",
    });
  });
  it("changes brewed_before filter", () => {
    expect(
      reducer(previousState, changeFilterBrewed_before("07-2012"))
    ).toEqual({
      ...previousState,
      brewed_before: "07-2012",
    });
  });
  it("changes brewed_after filter", () => {
    expect(reducer(previousState, changeFilterBrewed_after("07-2010"))).toEqual(
      {
        ...previousState,
        brewed_after: "07-2010",
      }
    );
  });
  it("changes malt filter", () => {
    expect(reducer(previousState, changeFilterMalt("Crystal"))).toEqual({
      ...previousState,
      malt: "Crystal",
    });
  });
  it("changes food filter", () => {
    expect(reducer(previousState, changeFilterFood("pizza"))).toEqual({
      ...previousState,
      food: "pizza",
    });
  });
});

it("resets all filters to the initial state", () => {
  expect(reducer(previousState, resetFilters())).toEqual(initialState);
});
