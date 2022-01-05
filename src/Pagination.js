import React from "react";
import { useState, useEffect } from "react";
import "./custom.scss";
import * as bootstrap from "bootstrap";

const Pagination = (props) => {
  return (
    <div>
      <nav aria-label="page">
        <ul className="pagination">
          <li className={props.page <= 1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" onClick={() => props.changePage(-1)}>
              &#8592;
            </a>
          </li>
          <li className={props.page === 1 ? "page-item active" : "page-item"}>
            <a className="page-link" href="#" onClick={() => props.setPage(1)}>
              1
            </a>
          </li>
          <li
            className={props.page === 2 ? "page-item active" : "page-item"}
            aria-current="page"
          >
            <a className="page-link" href="#" onClick={() => props.setPage(2)}>
              2
            </a>
          </li>
          <li className={props.page === 3 ? "page-item active" : "page-item"}>
            <a className="page-link" href="#" onClick={() => props.setPage(3)}>
              3
            </a>
          </li>

          <li
            style={props.page <= 3 ? { display: "none" } : {}}
            className="page-item active"
          >
            <a className="page-link">{props.page}</a>
          </li>

          <li
            className={
              props.page === props.maxPages ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              href="#"
              onClick={() => props.changePage(1)}
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
