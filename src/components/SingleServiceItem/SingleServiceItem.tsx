import React, { useEffect, useState } from "react";
import { PlusMinusHandler } from "../PlusMinusHandler";
import { IndividualService } from "../Calculator/calculator-types";
import { getUnNormalShownPrice } from "../../utils/getUnNormalShownPrice";
import { addOrUpdateSingleService, getSavedServiceCount } from "../../utils/sessionStorageMethods";
import "./SingleService.scss";
import stepStore from "../../stores/step-store";

interface Props {
  serviceStorageName: string
  service: IndividualService
  unNormalPriceChange?: boolean
}

export const SingleServiceItem: React.FC<Props> = React.memo(({ serviceStorageName, service, unNormalPriceChange }) => {
  const [priceCount, setPriceСount] = useState(service.count || 0)
  const { title, description, price } = service;
  const shownPrice = priceCount === 0 ? 0 : price * priceCount;

  useEffect(() => {
    getSavedServiceCount(stepStore.step, serviceStorageName, setPriceСount, service)
  }, [serviceStorageName, service])

  useEffect(() => {
    addOrUpdateSingleService(stepStore.step, serviceStorageName, service.title, priceCount, shownPrice)
  }, [serviceStorageName, priceCount, service.title, shownPrice])

  return (
    <div className="singleService">
      <div className="singleService__left">
        <b>{title}</b>
        <p>{description}</p>
      </div>
      <div className="singleService__right">
        <PlusMinusHandler setPriceСount={setPriceСount} priceСount={priceCount} />
        {unNormalPriceChange && title === 'Kaskadenschaltung'
          ? (<p className="service_price">{getUnNormalShownPrice(price, priceCount)}.00 €</p>)
          : (<p className="service_price">{shownPrice}.00 €</p>)
        }
      </div>
    </div>
  );
})
