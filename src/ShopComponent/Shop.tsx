import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import BeerSearch from "./BeerSearch";
import Pagination from "../Pagination";
import ToggleView from "./ToggleView";
import TableOfItems from "./TableOfItems";
import CardsOfItems from "./CardsOfItems";
import { getBeersData } from "../redux/allBeers";
import { Modal, Button } from "react-bootstrap";
import { hideModal } from "../redux/modal";

function Shop() {
  const errorMessageNoiItemsToDisplay: string =
    "No items to display. Check your filters above.";
  const { filters, modal } = useAppSelector((state) => state);
  const items = useAppSelector((state) => state.allBeers.beersList);
  const dispatch = useAppDispatch();
  const maxPages: number = 13; //here You can set maximal number of pages in items list
  const [showCards, setShowCards] = useState<boolean>(true); // options of display items: true - displays cards, false - displays table

  /*   useEffect(() => {
    const checkErrorMessage = () => {
      console.log(
        "filters.page:",
        filters.page,
        "items.length:",
        items.length,
        "items:",
        items
      );
    };
    checkErrorMessage();
  }, [items]); */

  useEffect(() => {
    dispatch(getBeersData());
  }, [filters]);

  return (
    <div className="container-lg bg-dark text-light px-5 py-5">
      <BeerSearch />
      <div
        style={
          items && !items.length && filters.page === 1
            ? { display: "none" }
            : {}
        }
      >
        <div className="d-flex justify-content-between">
          <div className="col-auto">
            <Pagination maxPages={maxPages} />
          </div>
          <ToggleView
            showCards={showCards}
            setShowCardsToParent={(showCards: boolean) =>
              setShowCards(showCards)
            }
          />
        </div>
        <div style={showCards ? { display: "none" } : {}}>
          <TableOfItems />
        </div>

        <div style={showCards ? {} : { display: "none" }}>
          {/* Cards of Items */}
          <CardsOfItems />
        </div>
        <Pagination maxPages={maxPages} />
      </div>
      <div
        style={
          items && !items.length && filters.page === 1
            ? {}
            : { display: "none" }
        }
      >
        <h3>{errorMessageNoiItemsToDisplay}</h3>
      </div>
      {/* @TODO Modal dark theme, or maybe switch themes of all app */}
      <Modal
        show={modal.show}
        onHide={() => dispatch(hideModal())}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wrong search filters parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hideModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*       <div
        className="modal fade text-dark"
        tabIndex={-1}
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
              {modal.description}
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
      </div> */}
    </div>
  );
}

export default Shop;
