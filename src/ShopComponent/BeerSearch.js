import React from "react";

const BeerSearch = () => {
  
  const handleFilters = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (value == "null" || value == "undefined") {
      value = null;
    }
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
        let WrongSearch = new Modal(document.getElementById("WrongSearch"));
        setWrongSearchDescription(
          'in your search, "brewed after" date must be earlier than "brewed before".'
        );
        WrongSearch.show();
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

    const filtersDispatches = {
      page: dispatch(changeFilterPage(value)),
      per_page: dispatch(changeFilterPer_page(value)),
      abv_gt: dispatch(changeFilterAbv_gt(value)),
      abv_lt: dispatch(changeFilterAbv_lt(value)),
      beer_name: dispatch(changeFilterBeer_name(value)),
      brewed_before: dispatch(changeFilterBrewed_before(value)),
      brewed_after: dispatch(changeFilterBrewed_after(value)),
      malt: dispatch(changeFilterMalt(value)),
      food: dispatch(changeFilterFood(value)),
    };

    const makeDispatch = Object.entries(filtersDispatches).filter(
      ([key, value]) => key === name
    );

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
            type="text"
            onChange={handleFilters}
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
