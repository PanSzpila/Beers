import { useState, useEffect } from "react";
import "./App.css";

function ItemDetail({ match }) {
  useEffect(() => {
    fetchItem();
    console.log(match);
  }, []);

  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    const fetchItem = await fetch(`https://api.punkapi.com/v2/beers/1`);
    const item = await fetchItem.json();

    console.log(item);
  };

  return (
    <div>
      <h1>Item</h1>
    </div>
  );
}

export default ItemDetail;
