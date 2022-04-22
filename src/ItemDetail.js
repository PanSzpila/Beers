import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ItemDetail(props) {
  const { id } = useSelector((state) => state.actualItem);
  const [item, setItem] = useState();

  useEffect(() => {
    const fetchItem = async (id) => {
      let fetchedItem = await fetch(`${props.apiUrl}/${id}`).then((response) =>
        response.json()
      );
      fetchedItem = fetchedItem[0];
      setItem(fetchedItem);
    };

    fetchItem(id);
  }, []);

  console.log(item);

  return (
    <div className="container-lg bg-dark text-light px-5 py-5">
      <div className="row">
        <div className="col-sm-6 col-md-3 col-xl-2">
          <img
            src={item && item.image_url}
            alt="beer image"
            className="CenterImg"
            height="50"
          />
        </div>
        <div className="col-sm-6 col-md-9 col-xl-10">
          <h2>{item && item.name}</h2>
          <p>{item && item.description}</p>
          <ul>
            <li>first brewed: {item && item.first_brewed}</li>
            <li>item id: {item && id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
