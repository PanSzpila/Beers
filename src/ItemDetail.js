import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  const renderTooltipIBU = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      International Bitterness Units scale. A gauge of beer's bitterness. What
      IBUs measure are the parts per million of isohumulone found in a beer.
    </Tooltip>
  );
  const renderTooltipSRM = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Beer Color The Standard Reference Method.
    </Tooltip>
  );
  const renderTooltipAttenuation = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      In brewing, attenuation refers to the conversion of sugars into alcohol
      and carbon dioxide by the fermentation process; the greater the
      attenuation, the more sugar has been converted into alcohol. A more
      attenuated beer is drier and more alcoholic than a less attenuated beer
      made from the same wort.
    </Tooltip>
  );

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
                      item.ingredients.malt.map((malt, index) => (
                        <li
                          key={index}
                        >{`${malt.name} - ${malt.amount.value} ${malt.amount.unit}`}</li>
                      ))}
                  </ul>
                </li>
                <li>
                  Hops:
                  <ul>
                    {item &&
                      item.ingredients.hops.map((hop, index) => (
                        <li
                          key={index}
                        >{`${hop.name} - ${hop.amount.value} ${hop.amount.unit}`}</li>
                      ))}
                  </ul>
                </li>
                <li>Yeast: {item && ` ${item.ingredients.yeast}`}</li>
              </ul>
            </li>
            <li>alcohol (ABV): {item && item.abv} %</li>
            <li>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipIBU}
              >
                <span>IBU: {item && item.ibu}</span>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipSRM}
              >
                <span>SRM: {item && item.srm}</span>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAttenuation}
              >
                <span>Attenuation level: {item && item.attenuation_level}</span>
              </OverlayTrigger>
            </li>
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
