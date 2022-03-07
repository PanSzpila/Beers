import React from "react";
import Skeleton from "./images/Two beer skeleton.jpg";

const Home = () => {
  return (
    <div className="container-lg bg-dark px-5 pb-5">
      <div>
        <img
          className="CenterImg"
          src={Skeleton}
          alt="Skeleton image"
          width="500"
          height="500"
        />
      </div>

      <h1> Home Page </h1>
    </div>
  );
};

export default Home;
