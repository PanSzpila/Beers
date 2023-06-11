import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BeerSearch from "./BeerSearch";
import Pagination from "../Pagination";
import ToggleView from "./ToggleView";
import TableOfItems from "./TableOfItems";
import CardsOfItems from "./CardsOfItems";
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
          <div className="col-auto">
            <Pagination maxPages={maxPages} />
          </div>
          <ToggleView
            showCards={showCards}
            setShowCardsToParent={(showCards) => setShowCards(showCards)}
          />
        </div>
        <div style={showCards ? { display: "none" } : {}}>
          <TableOfItems />
        </div>

        <div style={showCards ? {} : { display: "none" }}>
          {/* Cards of Items */}
          <CardsOfItems />
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
