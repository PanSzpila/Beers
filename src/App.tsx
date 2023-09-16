import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Shop from "./ShopComponent/Shop";
import ItemDetail from "./ItemDetail";
import { Provider } from "react-redux";


function App() {
  return (
    <Provider store={store}>
      <Router basename="/Beers">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:name" element={<ItemDetail />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;
