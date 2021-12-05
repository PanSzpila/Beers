import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import "./App.css";

function ItemDetail(props) {
  // console.log(props);
  // const { id: name } = useParams();

  useEffect(() => {
    fetchItem(props.itemId);
    //  console.log(`useParams.name === ${name}`);
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
