import React, { useState } from "react";
import { PlusMinusHandler } from "../PlusMinusHandler";

import "./SingleService.scss";
import { SingleService } from "../Calculator/calculator-types";
import { getUnNormalShownPrice } from "../../utils/getUnNormalShownPrice";

interface Props {
  service: SingleService
  setTotalPrice: (value: number) => void
  unNormalPriceChange?: boolean
}

export const SingleServiceItem: React.FC<Props> = ({ service, setTotalPrice, unNormalPriceChange }) => {
  const [priceCount, setPriceСount] = useState(0)
  const { blackTitle, greyTitle, price } = service;
  const shownPrice = priceCount === 0 ? 0 : price * priceCount;


  return (
    <div className="singleService">
      <div className="singleService__left">
        <b>{blackTitle}</b>
        <p>{greyTitle}</p>
      </div>
      <div className="singleService__right">
        <PlusMinusHandler setPriceСount={setPriceСount} priceСount={priceCount} setTotalPrice={setTotalPrice} />
        {unNormalPriceChange
          ? (<p className="service_price">{getUnNormalShownPrice(price, priceCount)}.00 €</p>)
          : (<p className="service_price">{shownPrice}.00 €</p>)
        }
      </div>
    </div>
  );
}
