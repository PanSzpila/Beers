import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  changeFilterPage,
  changeFilterPageIncrement,
  changeFilterPageDecrement,
} from "./redux/filters";

const Pagination = (props: any) => {
  const page = useAppSelector((state) => state.filters.page);
  const dispatch = useAppDispatch();

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
