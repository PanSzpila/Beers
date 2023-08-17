import React from "react";
import { Link } from "react-router-dom";


// @ts-expect-error TS(2307): Cannot find module './images/Two beer skeleton.jpg... Remove this comment to see the full error message
import Skeleton from "./images/Two beer skeleton.jpg";

const Home = () => {
  return (
    <div className="container-lg bg-dark text-light px-5 pb-5">
      <div>
        <img
          className="CenterImg"
          src={Skeleton}
          alt="Skeleton image"
          width="20"
          height="20"
        />
      </div>

      <h1> Beers </h1>
      <h4>
        Fake site when user can search for interesting beers and view details.
      </h4>

      <h2>
        klick the <Link to="/shop">"Shop"</Link> tab{" "}
        <Link to="/shop">(or here)</Link>. The interesting features are there.
      </h2>
      <h5>Based on:</h5>
      <ul>
        <li>HTML, CSS, JavaScript, of course.</li>
        <li>React with functional components with hooks</li>
        <ul>
          <li>own components as well as component imported via npm</li>
          <li>react router</li>
        </ul>
        <li>redux</li>
        <li>bootstrap</li>
        <li>custom SCSS (sass)</li>
        <ul>
          <li>variables</li>
          <li>functions</li>
        </ul>
        <li>REST API integration</li>
        <ul>
          <li>filtering items, showing details</li>
        </ul>
      </ul>
      <h5>To do at first:</h5>
      <ul></ul>
      <h5>Known Issues (starting from most important): CSS:</h5>

      <ul>
        <li>
          Pagination border-radius to small (should be 0,7 like everywhere else
          ($mainBorderRadius in custom.css:16)
        </li>
        <li>
          "bird symbol" in shop, "items on page" is dark, should be $lightGrey,
          but there is no class where i can change it).
        </li>
      </ul>
    </div>
  );
};

export default Home;
