//https://www.youtube.com/watch?v=Law7wfdg_ls   30' "

import { useState } from "react";
import "./App.css";
import Nav from "./Nav";
import About from "./About";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [itemId, setItemId] = useState([]);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/shop"
            exact
            element={<Shop GetId={(itemId) => setItemId(itemId)} />}
          />
          <Route path="/shop/:name" element={<ItemDetail itemId={itemId} />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1> Home Page </h1>
  </div>
);

export default App;
