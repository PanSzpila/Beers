import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Shop(props) {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("https://api.punkapi.com/v2/beers");

    const items = await data.json();
    //  console.log(items);
    setItems(items);
  };

  return (
    <div>
      {items.map((item) => (
        <h4 key={item.id}>
          <Link
            to={`/shop/${item.name.replace(/ /g, "-")}`}
            onClick={() => props.GetId(item.id)}
          >
            {item.name}
          </Link>
        </h4>
      ))}
    </div>
  );
}

//onclick item name, line 24 -> get id?

export default Shop;
