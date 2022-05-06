import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav1";
import Home from "./Home";
import About from "./About";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";

function App() {
  const apiUrl = "https://api.punkapi.com/v2/beers";

  return (
    <Router basename="/Beers">
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" exact element={<Shop apiUrl={apiUrl} />} />
          <Route path="/shop/:name" element={<ItemDetail apiUrl={apiUrl} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
