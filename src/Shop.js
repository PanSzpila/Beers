import { useState, useEffect } from "react";
import "./custom.scss";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";

function Shop(props) {
  const maxAbv = 15; //here You can set maximal alcohol percent ratio available in items search filters and range input
  const maxPages = 13; //here You can set maximal number of pages in items list
  const [showCards, setShowCards] = useState("table"); // options: "err", "cards", "table"
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    //filters to api
    page: 1,
    per_page: 25,
    abv_gt: undefined,
    abv_lt: undefined,
    beer_name: undefined,
    brewed_before: undefined,
    brewed_after: undefined,
    malt: undefined,
    food: undefined,
  });
  const [abv_ltRange, setAbv_ltRange] = useState(maxAbv); //similar to filters.abv_lt, but this is changing onChange of range input instead of mouseDown.
  const [abv_gtRange, setAbv_gtRange] = useState(0); //similar to filters.abv_gt, but this is changing onChange of range input instead of mouseDown.
  const [brewed_beforeDate, SetBrewed_beforeDate] = useState(new Date()); //similar to filters.brewed_before, but here is date format, and filters.brewed_before is in api-friendly string
  const [brewed_afterDate, SetBrewed_afterDate] = useState(); //similar to filters.brewed_after, but here is date format, and filters.brewed_before is in api-friendly string

  const filters0 = {
    // I hadn't better idea to easily reset state of filters (above)
    page: 1,
    per_page: 25,
    abv_gt: undefined,
    abv_lt: undefined,
    beer_name: undefined,
    brewed_before: undefined,
    brewed_after: undefined,
    malt: undefined,
    food: undefined,
  };

  useEffect(() => {
    fetchItems(urlWithFilters());
  }, [filters]);

  const handleFilters = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (value === "undefined") value = undefined;
    if (name === "brewed_before" || name === "brewed_after") {
      const d = new Date(value);
      name === "brewed_before"
        ? SetBrewed_beforeDate(d)
        : SetBrewed_afterDate(d);
      value = ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
      if (
        brewed_beforeDate &&
        brewed_afterDate &&
        brewed_beforeDate.getTime() > brewed_afterDate.getTime()
      ) {
        alert(
          'in your search, "brewed after" date must be earlier than "brewed before"'
        );
      }
    }
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
      page: 1,
    }));
    if (
      (name === "abv_gt" || name === "abv_lt") &&
      filters.abv_gt >= filters.abv_lt
    )
      alert(
        "in your search, minimal percentage of alcohol must be less than maximal percentage" // bug: działa czasem źle, pewnie chodzi oto że funkcja się wywoła przed updatem stanu (mimo że update jest kilka linijek wyżej)
      );
  };

  const changePage = (direction) => {
    let value = filters.page + direction;
    if (value < 1 || value > maxPages)
      return console.log("page number beyound the scope");
    // console.log(value);
    setFilters((prevState) => ({
      ...prevState,
      page: value,
    }));
  };

  const setPage = (newPage) =>
    setFilters((prevState) => ({
      ...prevState,
      page: newPage,
    }));

  const fetchItems = async (url) => {
    const data = await fetch(url);
    const fetchedItems = await data.json();
    setItems(fetchedItems);
    console.log(items); //bug: Wyświetla dla poprzedniego stanu. nieaktualne informacje. Chciałbym zrobić że jeśli itemy są nie sfeczowane to niech wyświetla warning aby zmienić kryteria wyszukiwania, ale nie wiem gdzie mam to umiścić by stan był aktualny a nie poprzedni.
  };

  const urlWithFilters = () => {
    if (filters === filters0) return props.apiUrl;
    let changedAdress = props.apiUrl + "?";

    for (const [key, value] of Object.entries(filters)) {
      if (value != undefined && value != "")
        changedAdress = changedAdress + key + "=" + value + "&";
    }
    changedAdress = changedAdress.slice(0, -1);
    //  console.log(changedAdress);
    return changedAdress;
  };

  return (
    <div className="container-lg">
      <div>
        {" "}
        {/* Form - beer search */}
        <form className="row">
          <div className="form-floating mb-3 col-md-10 col-xl-4">
            <input
              type="search"
              className="form-control form-floating"
              id="beer_name"
              name="beer_name"
              placeholder="beer name"
              onChange={handleFilters}
            />
            <label htmlFor="beer_name" className="form-label">
              Beer name:
            </label>
          </div>
          <div className="form-floating mb-3 col-md-2 col-xl-2">
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

          <div className="mb-3 col-md-6 col-xl-3">
            <label htmlFor="abv_gt" className="form-label">
              alcohol min % (ABV): {abv_gtRange}{" "}
              {/* bug: zmienna tutaj nie resetuje się po kliknięciu reset filters */}
            </label>
            <input
              className="form-range"
              onInput={(e) => setAbv_gtRange(e.target.value)}
              onMouseUp={handleFilters}
              type="range"
              id="abv_gt"
              name="abv_gt"
              min="0"
              max={maxAbv}
              defaultValue="0"
              step="0.5"
            ></input>
          </div>

          <div className="mb-3  col-md-6 col-xl-3">
            <label htmlFor="abv_lt" className="form-label">
              alcohol max % (ABV): {abv_ltRange}
            </label>
            <input
              className="form-range"
              onInput={(e) => setAbv_ltRange(e.target.value)}
              onMouseUp={handleFilters}
              type="range"
              id="abv_lt"
              name="abv_lt"
              min="0"
              max={maxAbv}
              defaultValue={maxAbv}
              step="0.5"
            ></input>
          </div>

          <div className="form-floating mb-3 col-md-2">
            <input
              type="month"
              onChange={handleFilters}
              className="form-control form-floating"
              id="brewed_after"
              name="brewed_after"
              required
              pattern="[0-9]{2}-[0-9]{4}"
            />
            <label htmlFor="brewed_after">brewed_after:</label>
          </div>

          <div className="form-floating mb-3 col-md-2">
            <input
              type="month"
              className="form-control form-floating"
              onChange={handleFilters}
              id="brewed_before"
              name="brewed_before"
            />
            <label htmlFor="brewed_before">brewed_before:</label>
          </div>

          <div className="form-floating mb-3 col-md-4">
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

          <div className="form-floating mb-3 col-md-4">
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
          <div className="mb-3">
            <input
              type="reset"
              className="btn btn-primary"
              value="reset filters"
              onClick={() => setFilters(filters0)}
            ></input>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-between">
        {" "}
        {/* Pagination and buttons - toggle View */}
        <div className="col-auto">
          <Pagination
            page={filters.page}
            maxPages={maxPages}
            changePage={(newPage) => changePage(newPage)}
            setPage={(newPage) => setPage(newPage)}
          />
        </div>
        <div className="col-auto">
          {" "}
          {/* buttons - toggle View */}
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="grid-icon"
            className="css-1jgj49j"
            onClick={() => {
              setShowCards("cards");
              console.log(showCards);
            }}
          >
            <path
              d="M10 13l1 1v7l-1 1H3l-1-1v-7l1-1h7zm7.5 0c2.481 0 4.5 2.018 4.5 4.5S19.981 22 17.5 22a4.505 4.505 0 01-4.5-4.5c0-2.482 2.019-4.5 4.5-4.5zM9 15H4v5h5v-5zm8.5 0a2.503 2.503 0 00-2.5 2.5c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5zM10 2l1 1v7l-1 1H3l-1-1V3l1-1h7zm11 0l1 1v7l-1 1h-7l-1-1V3l1-1h7zM9 4H4v5h5V4zm11 0h-5v5h5V4z"
              fill={showCards === "cards" ? "grey" : "currentColor"}
              fillRule="evenodd"
            ></path>
          </svg>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="list-icon"
            className="css-73cnv0"
            onClick={() => {
              setShowCards("table");
              console.log(showCards);
            }}
          >
            <path
              d="M3.768 15.99l.59 1.02-.59 1.022H2.59L2 17.01l.59-1.021h1.178zm17.41 0l.217.217.567.566.217.217-1 1h-14l-1-1 1-1h14zm-17.41-4.948l.589 1.02-.589 1.022H2.589L2 12.063l.589-1.021h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14zM3.769 6l.589 1.02-.589 1.022h-1.18L2 7.02 2.589 6h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14z"
              fill={showCards === "table" ? "grey" : "currentColor"}
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div style={showCards === "table" ? {} : { display: "none" }}>
        {" "}
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
            {items.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  <img src={item.image_url} alt="beer mini image" height="50" />
                </td>
                <td>
                  <Link
                    to={`/shop/${item.name
                      .replace(/ /g, "-")
                      .replace(/\//g, "-")}`}
                    onClick={() => props.GetId(item.id)}
                  >
                    {item.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={showCards === "cards" ? {} : { display: "none" }}>
        {" "}
        {/* Cards of Items */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {items.map((item) => (
            <div key={item.id} className="col">
              <Link
                to={`/shop/${item.name.replace(/ /g, "-").replace(/\//g, "-")}`}
                onClick={() => props.GetId(item.id)}
              >
                <div className="card">
                  <img
                    src={item.image_url}
                    className="card-img-top"
                    alt="beer mini image"
                    height="50"
                    width="auto"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.id}. {item.name}
                    </h5>
                    <p className="card-text text-truncate">
                      {" "}
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <div className="col">
            <div className="card">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={showCards === "err" ? {} : { display: "none" }}>
        {" "}
        {/* message when error */}
        <h1>Error in display of items list. Check your filters above.</h1>
      </div>

      <Pagination // Pagination
        page={filters.page}
        maxPages={maxPages}
        changePage={(newPage) => changePage(newPage)}
        setPage={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Shop;
