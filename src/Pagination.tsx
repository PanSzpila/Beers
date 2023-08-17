import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilterPage,
  changeFilterPageIncrement,
  changeFilterPageDecrement,
} from "./redux/filters";

const Pagination = (props) => {


  // @ts-expect-error TS(2339): Property 'filters' does not exist on type 'Default... Remove this comment to see the full error message
  const page = useSelector((state) => state.filters.page);
  const dispatch = useDispatch();

  return (
    <div className="pagination-nav">
      <nav aria-label="page">
        <ul className="pagination">
          <li className={page <= 1 ? "page-item disabled" : "page-item"}>
            <a
              className="page-link"
              onClick={() => dispatch(changeFilterPageDecrement())}
            >
              &#8592;
            </a>
          </li>
          <li className={page === 1 ? "page-item active" : "page-item"}>
            <a
              className="page-link"
              href="#"
              onClick={() => dispatch(changeFilterPage(1))}
            >
              1
            </a>
          </li>
          <li
            className={page === 2 ? "page-item active" : "page-item"}
            aria-current="page"
          >
            <a
              className="page-link"
              href="#"
              onClick={() => dispatch(changeFilterPage(2))}
            >
              2
            </a>
          </li>
          <li className={page === 3 ? "page-item active" : "page-item"}>
            <a
              className="page-link"
              href="#"
              onClick={() => dispatch(changeFilterPage(3))}
            >
              3
            </a>
          </li>

          <li
            style={page <= 3 ? { display: "none" } : {}}
            className="page-item active"
          >
            <a className="page-link">{page}</a>
          </li>

          <li
            className={
              page === props.maxPages ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              href="#"
              onClick={() => dispatch(changeFilterPageIncrement())}
            >
              &#8594;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
