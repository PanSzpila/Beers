import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actualItemId } from "../redux/actualItem";

const CardsOfItems = () => {
  const dispatch = useDispatch();

  // @ts-expect-error TS(2339): Property 'allBeers' does not exist on type 'Defaul... Remove this comment to see the full error message
  const items = useSelector((state) => state.allBeers.beersList);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
      {items?.length &&
        items.map((item) => (
          <div key={item.id} className="col">
            <Link
              to={`/shop/${item.name.replace(/ /g, "-").replace(/\//g, "-")}`}
              onClick={() => dispatch(actualItemId(item.id))}
            >
              <div className="card">
                <img
                  src={item.image_url}
                  className="card-img-top"
                  alt="beer mini image"
                  height="50"
                  width="25"
                />
                <div className="card-body">
                  <h5 className="card-title crop-text-2">
                    {item.id}. {item.name}
                  </h5>
                  <p className="card-text crop-text-4">{item.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CardsOfItems;
