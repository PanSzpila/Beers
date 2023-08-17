import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Shop from "./ShopComponent/Shop";
import ItemDetail from "./ItemDetail";
import { Provider } from "react-redux";

function App() {
  const apiUrl = "https://api.punkapi.com/v2/beers";
  return (
    <Provider store={store}>
      <Router basename="/Beers">
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* // @ts-expect-error TS(2322): Type '{ path: string; exact: true; element: Elemen... Remove this comment to see the full error message */}
            <Route path="/shop" exact element={<Shop apiUrl={apiUrl} />} />
            <Route
              path="/shop/:name"
              element={<ItemDetail apiUrl={apiUrl} />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
