import { useState, useEffect } from "react";

function ItemDetail(props) {
  useEffect(() => {
    const fetchItem = async (id) => {
      let fetchedItem = await fetch(`${props.apiUrl}/${id}`).then((response) =>
        response.json()
      );
      fetchedItem = fetchedItem[0];
      setItem(fetchedItem);
    };

    fetchItem(props.itemId);
  }, []);

  const [item, setItem] = useState();

  return (
    <div>
      <h1>
        Item {props.itemId}: {item && item.name}
      </h1>
      <div></div>
    </div>
  );
}

export default ItemDetail;
