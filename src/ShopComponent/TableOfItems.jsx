import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableOfItems = (props) => {
  const items = useSelector((state) => state.allBeers.beersList);

  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">item name</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>
              <img src={item.image_url} alt="beer mini image" height="50" />
            </td>
            <td>
              <Link
                to={`/shop/${item?.name
                  .replace(/ /g, "-")
                  .replace(/\//g, "-")}`}
                onClick={() => dispatch(actualItemId(item.id))}
              >
                {item.name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfItems;
