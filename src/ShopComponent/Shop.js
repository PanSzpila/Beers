import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import MultiRange from "./MultiRange";
import {
  changeFilterPer_page,
  changeFilterBeer_name,
  changeFilterBrewed_before,
  changeFilterBrewed_after,
  changeFilterMalt,
  changeFilterFood,
  resetFilters,
} from "../redux/filters";
import { resetAbvRangeTrue } from "../redux/resetAbvRange";
import { actualItemId } from "../redux/actualItem";
import { getBeersData } from "../redux/allBeers";

function Shop(props) {
  const { filters } = useSelector((state) => state);
  const items = useSelector((state) => state.allBeers.beersList);
  const dispatch = useDispatch();

  const maxAbv = 15; //here You can set maximal alcohol percent ratio available in items search filters and range input
  const maxPages = 13; //here You can set maximal number of pages in items list
  const [showCards, setShowCards] = useState(true); // options of display items: true - displays cards, false - displays table
  const [brewed_beforeDate, setBrewed_beforeDate] = useState(new Date()); //similar to filters.brewed_before, but here is date format, and filters.brewed_before is in api-friendly string
  const [brewed_afterDate, setBrewed_afterDate] = useState(); //similar to filters.brewed_after, but here is date format, and filters.brewed_before is in api-friendly string
  const [wrongSearchDescription, setWrongSearchDescription] = useState(
    "In your search, minimal percentage of acohol must be lower than maximal."
  ); //description in modal if you set wrong search parameters

  useEffect(() => {
    dispatch(getBeersData());
  }, []);

  useEffect(() => {
    dispatch(getBeersData());
  }, [filters]);

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
    <div className="container-lg bg-dark text-light px-5 py-5">
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

      <div
        style={
          items
            ? filters.page === 1 && !items.length
              ? { display: "none" }
              : {}
            : { display: "none" }
        }
      >
        <div className="d-flex justify-content-between">
          {/* Pagination and buttons - toggle View */}
          <div className="col-auto">
            <Pagination maxPages={maxPages} />
          </div>
          <div className="col-auto">
            {/* buttons - toggle View */}
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-testid="grid-icon"
              className={showCards ? "svg-active" : "svg"}
              onClick={() => {
                setShowCards(true);
              }}
            >
              <path
                d="M10 13l1 1v7l-1 1H3l-1-1v-7l1-1h7zm7.5 0c2.481 0 4.5 2.018 4.5 4.5S19.981 22 17.5 22a4.505 4.505 0 01-4.5-4.5c0-2.482 2.019-4.5 4.5-4.5zM9 15H4v5h5v-5zm8.5 0a2.503 2.503 0 00-2.5 2.5c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5zM10 2l1 1v7l-1 1H3l-1-1V3l1-1h7zm11 0l1 1v7l-1 1h-7l-1-1V3l1-1h7zM9 4H4v5h5V4zm11 0h-5v5h5V4z"
                fillRule="evenodd"
              ></path>
            </svg>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-testid="list-icon"
              className={showCards ? "svg" : "svg-active"}
              onClick={() => {
                setShowCards(false);
              }}
            >
              <path
                d="M3.768 15.99l.59 1.02-.59 1.022H2.59L2 17.01l.59-1.021h1.178zm17.41 0l.217.217.567.566.217.217-1 1h-14l-1-1 1-1h14zm-17.41-4.948l.589 1.02-.589 1.022H2.589L2 12.063l.589-1.021h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14zM3.769 6l.589 1.02-.589 1.022h-1.18L2 7.02 2.589 6h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div style={showCards ? { display: "none" } : {}}>
          {/* Table of Items */}
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">item name</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>
                    <img
                      src={item.image_url}
                      alt="beer mini image"
                      height="50"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/shop/${item?.name
                        .replace(/ /g, "-")
                        .replace(/\//g, "-")}`}
                      onClick={() => dispatch(actualItemId(item.id))}
                    >
                      {item.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={showCards ? {} : { display: "none" }}>
          {/* Cards of Items */}
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
            {items?.length &&
              items.map((item) => (
                <div key={item.id} className="col">
                  <Link
                    to={`/shop/${item.name
                      .replace(/ /g, "-")
                      .replace(/\//g, "-")}`}
                    onClick={() => dispatch(actualItemId(item.id))}
                  >
                    <div className="card">
                      <img
                        src={item.image_url}
                        className="card-img-top"
                        alt="beer mini image"
                        height="50"
                        width="25"
                      />
                      <div className="card-body">
                        <h5 className="card-title crop-text-2">
                          {item.id}. {item.name}
                        </h5>
                        <p className="card-text crop-text-4">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <Pagination // Pagination
          maxPages={maxPages}
        />
      </div>
      <div
        style={
          items
            ? filters.page === 1 && !items.length
              ? { display: "none" }
              : {}
            : { display: "none" }
        }
      >
        {/* message when error */}
        <h3>No items to display. Check your filters above.</h3>
      </div>

      <div
        className="modal fade text-dark"
        id="WrongSearch"
        tabIndex="-1"
        aria-labelledby="WrongSearchLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="WrongSearchLabel">
                Wrong search filters parameters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" id="WrongSearchDescription">
              {wrongSearchDescription}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
