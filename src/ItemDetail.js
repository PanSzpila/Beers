import { useState, useEffect } from "react";
import "./App.css";

function ItemDetail(props) {
  useEffect(() => {
    fetchItem(props.itemId);
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async (id) => {
    const fetchItem = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
    const item = await fetchItem.json();
    setItem(item);
    console.log(item);
  };

  return (
    <div>
      <h1>
        Item {props.itemId}: {item.name}
      </h1>
    </div>
  );
}

export default ItemDetail;
