import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type Param = {
  value: number;
  unit: string;
};

type Malt = {
  name: string;
  amount: Param;
};

type Hop = Malt & {
  add: string;
  attribute: string;
};

type Mash_temp = {
  temp: Param;
  duration: number;
};

export type ItemDetails = {
  abv: number;
  attenuation_level: number;
  boil_volume: Param;
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: Array<string>;
  ibu: number;
  id: number;
  image_url: string;
  ingredients: { malt: Array<Malt>; hops: Array<Hop>; yeast: string };
  method: {
    mash_temp: Array<Mash_temp>;
    fermentation: {
      temp: Param;
    };
    twist: null;
  };
  name: string;
  ph: number;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: Param;
};

function ItemDetail() {
  const { id } = useAppSelector((state) => state.actualItem);
  const [item, setItem] = useState<ItemDetails>({
    abv: 0,
    attenuation_level: 0,
    boil_volume: { value: 0, unit: "" },
    brewers_tips: "",
    contributed_by: "",
    description: "",
    ebc: 0,
    first_brewed: "",
    food_pairing: [],
    ibu: 0,
    id: 0,
    image_url: "",
    ingredients: { malt: [], hops: [], yeast: "" },
    method: {
      mash_temp: [],
      fermentation: {
        temp: {
          value: 0,
          unit: "",
        },
      },
      twist: null,
    },
    name: "",
    ph: 0,
    srm: 0,
    tagline: "",
    target_fg: 0,
    target_og: 0,
    volume: { value: 0, unit: "" },
  });

  useEffect(() => {
    const fetchItem = async (id: number | null) => {
      let fetchedItem = await fetch(
        `${process.env.REACT_APP_API_URL}/${id}`
      ).then((response) => response.json());
      fetchedItem = fetchedItem[0];
      setItem(fetchedItem);
    };

    fetchItem(id);
  }, []);

  const renderTooltipIBU = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      International Bitterness Units scale. A gauge of beer's bitterness. What
      IBUs measure are the parts per million of isohumulone found in a beer.
    </Tooltip>
  );
  const renderTooltipSRM = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Beer Color The Standard Reference Method.
    </Tooltip>
  );
  const renderTooltipAttenuation = (props: any) => (
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
            className="CenterImg item-detail-img"
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
            <li data-testid="food-pairing">
              Food pairing: {item && item.food_pairing}
            </li>
            <li>Brewer's tips: {item && item.brewers_tips}</li>
            <li>first brewed: {item && item.first_brewed}</li>
            <li>
              <h6>Ingredients:</h6>
              <ul>
                <li>
                  Malt:
                  <ul>
                    {item &&
                      item.ingredients.malt.map((malt: Malt, index: number) => (
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
                      item.ingredients.hops.map((hop: Hop, index: number) => (
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
