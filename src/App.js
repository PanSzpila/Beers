import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav1";
import Home from "./Home";
import About from "./About";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";

function App() {
  const [itemId, setItemId] = useState([]);
  const apiUrl = "https://api.punkapi.com/v2/beers";

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
            element={
              <Shop apiUrl={apiUrl} GetId={(itemId) => setItemId(itemId)} />
            }
          />
          <Route
            path="/shop/:name"
            element={<ItemDetail apiUrl={apiUrl} itemId={itemId} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
