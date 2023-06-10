import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BeerSearch from "./BeerSearch";
import Pagination from "../Pagination";
import ToggleView from "./ToggleView";
import { resetAbvRangeTrue } from "../redux/resetAbvRange";
import { actualItemId } from "../redux/actualItem";
import { getBeersData } from "../redux/allBeers";

function Shop(props) {
  const { filters } = useSelector((state) => state);
  const items = useSelector((state) => state.allBeers.beersList);
  const dispatch = useDispatch();

  const maxPages = 13; //here You can set maximal number of pages in items list
  const [showCards, setShowCards] = useState(true); // options of display items: true - displays cards, false - displays table
  const [wrongSearchDescription, setWrongSearchDescription] = useState(
    "In your search, minimal percentage of acohol must be lower than maximal."
  ); //description in modal if you set wrong search parameters

  useEffect(() => {
    dispatch(getBeersData());
  }, []);

  useEffect(() => {
    dispatch(getBeersData());
  }, [filters]);

  return (
    <div className="container-lg bg-dark text-light px-5 py-5">
      <BeerSearch />
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
          <ToggleView
            showCards={showCards}
            setShowCardsToParent={(showCards) => setShowCards(showCards)}
          />
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
