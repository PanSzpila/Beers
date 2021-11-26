import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function ItemDetail() {
  console.log(useParams());
  const { id } = useParams();
  useEffect(() => {
    fetchItem(id);
    console.log(`useParams.id === ${id}`);
  }, []);

  const [item, setItem] = useState([]);

  const fetchItem = async (id) => {
    const fetchItem = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
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
