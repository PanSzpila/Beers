import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableOfItems = (props) => {


  // @ts-expect-error TS(2339): Property 'allBeers' does not exist on type 'Defaul... Remove this comment to see the full error message
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


                // @ts-expect-error TS(2304): Cannot find name 'dispatch'.
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
