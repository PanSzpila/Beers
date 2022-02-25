import { useState, useEffect } from "react";

function ItemDetail(props) {
  const [item, setItem] = useState();

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

  return (
    <div>
      <h1>
        Item {props.itemId}: {item && item.name}
      </h1>
      <div>
        <img src={item && item.image_url} alt="beer image" />
      </div>
      <p>{item && item.description}</p>
    </div>
  );
}

export default ItemDetail;
