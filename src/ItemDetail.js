import { useState, useEffect } from "react";
import "./custom.scss";

function ItemDetail(props) {
  useEffect(() => {
    fetchItem(props.itemId);
  }, []);

  const [item, setItem] = useState();

  const fetchItem = async (id) => {
    const fetchItem = await fetch(`${props.apiUrl}/${id}`);
    let fetchedItem = await fetchItem.json();
    fetchedItem = fetchedItem[0];
    setItem(fetchedItem);
  };

  return (
    <div>
      <h1>
        Item {props.itemId}: {item && item.name}
      </h1>
    </div>
  );
}

export default ItemDetail;
