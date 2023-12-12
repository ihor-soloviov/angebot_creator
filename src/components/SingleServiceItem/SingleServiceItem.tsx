import React, { useEffect, useState } from "react";
import { PlusMinusHandler } from "../PlusMinusHandler";

import "./SingleService.scss";
import { SingleService } from "../Calculator/calculator-types";
import { getUnNormalShownPrice } from "../../utils/getUnNormalShownPrice";
import stepStore from "../../stores/step-store";

interface Props {
  service: SingleService
  setTotalPrice: (value: number) => void
  unNormalPriceChange?: boolean
}

export const SingleServiceItem: React.FC<Props> = React.memo(({ service, setTotalPrice, unNormalPriceChange }) => {
  const [priceCount, setPriceСount] = useState(0)
  const { blackTitle, greyTitle, price } = service;
  const shownPrice = priceCount === 0 ? 0 : price * priceCount;

  const { step } = stepStore;

  useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('singleServices'));

    const currentItem = a.find(({ name }) => name === service.blackTitle);

    if (currentItem) {
      setPriceСount(currentItem.count)
    }
  }, [])


  console.log(step, service.blackTitle, priceCount, shownPrice)

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
})
