import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
            <li>
              Volume: {item && `${item.volume.value} ${item.volume.unit}`}
            </li>
            <li>Food pairing: {item && item.food_pairing}</li>
            <li>Brewer's tips: {item && item.brewers_tips}</li>
            <li>first brewed: {item && item.first_brewed}</li>
            <li>
              <h6>Ingredients:</h6>
              <ul>
                <li>
                  Malt:
                  <ul>
                    {item &&
                      item.ingredients.malt.map((malt) => (
                        <li
                          key={malt.name}
                        >{`${malt.name} - ${malt.amount.value} ${malt.amount.unit}`}</li>
                      ))}
                  </ul>
                </li>
                <li>
                  Hops:
                  <ul>
                    {item &&
                      item.ingredients.hops.map((hop) => (
                        <li
                          key={hop.name}
                        >{`${hop.name} - ${hop.amount.value} ${hop.amount.unit}`}</li>
                      ))}
                  </ul>
                </li>
                <li>Yeast: {item && ` ${item.ingredients.yeast}`}</li>
              </ul>
            </li>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>
              }
            >
              {({ ref, ...triggerHandler }) => <li>IBU: {item && item.ibu}</li>}
            </OverlayTrigger>

            <li>SRM: {item && item.srm}</li>
            <li>Attenuation level: {item && item.attenuation_level}</li>
            <li>Tagline: {item && item.tagline}</li>
            <li>contributed by: {item && item.contributed_by}</li>
            <li>item id: {item && id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
