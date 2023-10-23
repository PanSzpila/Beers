import { useState, ChangeEvent } from "react";
import MultiRange from "./MultiRange";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  changeFilterPer_page,
  changeFilterAbv_gt,
  changeFilterAbv_lt,
  changeFilterBeer_name,
  changeFilterBrewed_before,
  changeFilterBrewed_after,
  changeFilterMalt,
  changeFilterFood,
  resetFilters,
} from "../redux/filters";
import { resetAbvRangeTrue } from "../redux/resetAbvRange";
import { showModal, changeModalDescription } from "../redux/modal";

const BeerSearch = () => {
  const { filters } = useAppSelector((state) => state);
  const maxAbv = 15; //here You can set maximal alcohol percent ratio available in items search filters and range input
  const [brewed_beforeDate, setBrewed_beforeDate] = useState(new Date()); //similar to filters.brewed_before, but here is date format, and filters.brewed_before is in api-friendly string
  const [brewed_afterDate, setBrewed_afterDate] = useState(new Date()); //similar to filters.brewed_after, but here is date format, and filters.brewed_before is in api-friendly string
  const dispatch = useAppDispatch();

  const handleFilters = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { name } = e.target;
    let { value } = e.target;
    if (name === "brewed_before" || name === "brewed_after") {
      const date = new Date(value);
      name === "brewed_before"
        ? setBrewed_beforeDate(date)
        : setBrewed_afterDate(date);
      value =
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
      if (
        brewed_beforeDate &&
        brewed_afterDate &&
        brewed_beforeDate.getTime() > brewed_afterDate.getTime()
      ) {
        dispatch(
          changeModalDescription(
            'in your search, "brewed after" date must be earlier than "brewed before".'
          )
        );
        dispatch(showModal());
      }
    }

    /*     function createFiltersDispatches(filters) {
      const filtersDispatches = {};
      for (const [key, value] of Object.entries(filters)) {
        filtersDispatches[key] = dispatch(
          `changeFilter${key.charAt(0).toUpperCase() + key.slice(1)}(value)`
        );
      }
      return filtersDispatches;
    } */

    if (name === "per_page") {
      return dispatch(changeFilterPer_page(parseInt(value)));
    }
    if (name === "beer_name") {
      return dispatch(changeFilterBeer_name(value));
    }
    if (name === "brewed_before") {
      return dispatch(changeFilterBrewed_before(value));
    }
    if (name === "brewed_after") {
      return dispatch(changeFilterBrewed_after(value));
    }
    if (name === "malt") {
      return dispatch(changeFilterMalt(value));
    }
    if (name === "food") {
      return dispatch(changeFilterFood(value));
    } else {
      return console.warn(
        "wrong filter name in handleFilters function (possibly input name)"
      );
    }

    //@TODO - replace the ifs above with not perfect code below
    const filtersDispatches = {
      per_page: dispatch(changeFilterPer_page(parseInt(value))),
      abv_gt: dispatch(changeFilterAbv_gt(parseInt(value))),
      abv_lt: dispatch(changeFilterAbv_lt(parseInt(value))),
      beer_name: dispatch(changeFilterBeer_name(value)),
      brewed_before: dispatch(changeFilterBrewed_before(value)),
      brewed_after: dispatch(changeFilterBrewed_after(value)),
      malt: dispatch(changeFilterMalt(value)),
      food: dispatch(changeFilterFood(value)),
    };

    const makeDispatch = Object.entries(filtersDispatches).filter(
      ([key, value]) => key === name
    )[0][1];
    console.log("makeDispatch", makeDispatch);

    return makeDispatch
      ? makeDispatch
      : console.warn(
          "wrong filter name in handleFilters function (possibly input name)"
        );
  };

  return (
    <div>
      {/* Form - beer search */}
      <form className="row">
        <div
          className="form-floating mb-5 col-sm-9 col-xl-6"
          data-testid="form-label-beer-name"
        >
          <input
            type="search"
            className="form-control form-floating text-light"
            id="beer_name"
            name="beer_name"
            placeholder="beer name"
            onChange={handleFilters}
          />
          <label htmlFor="beer_name" className="form-label">
            Beer name:
          </label>
        </div>
        <div className="form-floating mb-5 col-sm-3 col-xl-2">
          <select
            className="form-select form-floating"
            value={filters.per_page}
            onChange={() => handleFilters}
            name="per_page"
            id="per_page"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="80">80</option>
          </select>
          <label htmlFor="per_page">items on page:</label>
        </div>
        <div className="form-floating mb-5 col-md-6 col-xl-4">
          <div className="App">
            <label
              htmlFor="MultiRange"
              className="form-label"
              id="multiRangeSliderLabel"
            >
              alcohol (ABV) - between {filters.abv_gt}%, and {filters.abv_lt}%
            </label>
            <MultiRange
              min={0}
              max={maxAbv}
              minValue={0}
              maxValue={maxAbv}
              step={1}
              ruler={false}
              label={false}
            />
          </div>
        </div>

        <div className="form-floating mb-5 col-sm-6 col-md-3 col-xl-2">
          <input
            type="month"
            onChange={handleFilters}
            className="form-control form-floating"
            id="brewed_after"
            name="brewed_after"
            required
            pattern="[0-9]{2}-[0-9]{4}"
          />
          <label htmlFor="brewed_after">brewed after:</label>
        </div>

        <div className="form-floating mb-5 col-sm-6 col-md-3 col-xl-2">
          <input
            type="month" /*TODO: month */
            className="form-control form-floating"
            onChange={handleFilters}
            id="brewed_before"
            name="brewed_before"
          />
          <label htmlFor="brewed_before">brewed before:</label>
        </div>

        <div className="form-floating mb-5 col-sm-6 col-xl-4">
          <input
            type="search"
            className="form-control form-floating"
            id="malt"
            name="malt"
            placeholder="malt"
            onChange={handleFilters}
            title="malts used to brew"
          />
          <label htmlFor="malt">malt:</label>
        </div>

        <div className="form-floating mb-4 col-sm-6 col-xl-4">
          <input
            type="search"
            className="form-control form-floating"
            id="food"
            name="food"
            placeholder="food"
            onChange={handleFilters}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="recomended with food"
          />
          <label htmlFor="food">food:</label>
        </div>
        <div className="mb-4">
          <input
            type="reset"
            className="btn btn-primary"
            value="reset filters"
            onClick={() => {
              dispatch(resetFilters());
              dispatch(resetAbvRangeTrue());
            }}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default BeerSearch;
