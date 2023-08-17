import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ItemDetail(props) {


  // @ts-expect-error TS(2339): Property 'actualItem' does not exist on type 'Defa... Remove this comment to see the full error message
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


            // @ts-expect-error TS(2339): Property 'image_url' does not exist on type 'never... Remove this comment to see the full error message
            src={item && item.image_url}
            alt="beer image"
            className="CenterImg"
            height="50"
          />
        </div>
        <div className="col-sm-6 col-md-9 col-xl-10">
          // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          <h2>{item && item.name}</h2>
          // @ts-expect-error TS(2339) FIXME: Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
          <p>{item && item.description}</p>
          <ul>
            <li>
              // @ts-expect-error TS(2339) FIXME: Property 'volume' does not exist on type 'never'.
              // @ts-expect-error TS(2339): Property 'volume' does not exist on type 'never'.
              // @ts-expect-error TS(2339): Property 'volume' does not exist on type 'never'.
              Volume: {item && `${item.volume.value} ${item.volume.unit}`}
            </li>
            <li data-testid="food-pairing">
              // @ts-expect-error TS(2339) FIXME: Property 'food_pairing' does not exist on type 'ne... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'food_pairing' does not exist on type 'ne... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'food_pairing' does not exist on type 'ne... Remove this comment to see the full error message
              Food pairing: {item && item.food_pairing}
            </li>
            // @ts-expect-error TS(2339) FIXME: Property 'brewers_tips' does not exist on type 'ne... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'brewers_tips' does not exist on type 'ne... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'brewers_tips' does not exist on type 'ne... Remove this comment to see the full error message
            <li>Brewer's tips: {item && item.brewers_tips}</li>
            // @ts-expect-error TS(2339) FIXME: Property 'first_brewed' does not exist on type 'ne... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'first_brewed' does not exist on type 'ne... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'first_brewed' does not exist on type 'ne... Remove this comment to see the full error message
            <li>first brewed: {item && item.first_brewed}</li>
            <li>
              <h6>Ingredients:</h6>
              <ul>
                <li>
                  Malt:
                  <ul>
                    {item &&


                      // @ts-expect-error TS(2339): Property 'ingredients' does not exist on type 'nev... Remove this comment to see the full error message
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


                      // @ts-expect-error TS(2339): Property 'ingredients' does not exist on type 'nev... Remove this comment to see the full error message
                      item.ingredients.hops.map((hop, index) => (
                        <li
                          key={index}
                        >{`${hop.name} - ${hop.amount.value} ${hop.amount.unit}`}</li>
                      ))}
                  </ul>
                </li>
                // @ts-expect-error TS(2339) FIXME: Property 'ingredients' does not exist on type 'nev... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'ingredients' does not exist on type 'nev... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'ingredients' does not exist on type 'nev... Remove this comment to see the full error message
                <li>Yeast: {item && ` ${item.ingredients.yeast}`}</li>
              </ul>
            </li>
            // @ts-expect-error TS(2339) FIXME: Property 'abv' does not exist on type 'never'.
            // @ts-expect-error TS(2339): Property 'abv' does not exist on type 'never'.
            // @ts-expect-error TS(2339): Property 'abv' does not exist on type 'never'.
            <li>alcohol (ABV): {item && item.abv} %</li>
            <li>
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipIBU}
              >
                // @ts-expect-error TS(2339) FIXME: Property 'ibu' does not exist on type 'never'.
                // @ts-expect-error TS(2339): Property 'ibu' does not exist on type 'never'.
                // @ts-expect-error TS(2339): Property 'ibu' does not exist on type 'never'.
                <span>IBU: {item && item.ibu}</span>
              </OverlayTrigger>
            </li>
            <li>
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipSRM}
              >
                // @ts-expect-error TS(2339) FIXME: Property 'srm' does not exist on type 'never'.
                // @ts-expect-error TS(2339): Property 'srm' does not exist on type 'never'.
                // @ts-expect-error TS(2339): Property 'srm' does not exist on type 'never'.
                <span>SRM: {item && item.srm}</span>
              </OverlayTrigger>
            </li>
            <li>
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAttenuation}
              >
                // @ts-expect-error TS(2339) FIXME: Property 'attenuation_level' does not exist on typ... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'attenuation_level' does not exist on typ... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'attenuation_level' does not exist on typ... Remove this comment to see the full error message
                <span>Attenuation level: {item && item.attenuation_level}</span>
              </OverlayTrigger>
            </li>
            // @ts-expect-error TS(2339) FIXME: Property 'tagline' does not exist on type 'never'.
            // @ts-expect-error TS(2339): Property 'tagline' does not exist on type 'never'.
            // @ts-expect-error TS(2339): Property 'tagline' does not exist on type 'never'.
            <li>Tagline: {item && item.tagline}</li>
            // @ts-expect-error TS(2339) FIXME: Property 'contributed_by' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'contributed_by' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'contributed_by' does not exist on type '... Remove this comment to see the full error message
            <li>contributed by: {item && item.contributed_by}</li>
            <li>item id: {item && id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
