//https://www.youtube.com/watch?v=Law7wfdg_ls   19' "

import "./App.css";
import Nav from "./Nav";
import About from "./About";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/shop/:id" element={<ItemDetail />} />
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
