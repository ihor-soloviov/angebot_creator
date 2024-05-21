import React, { useEffect, useState } from "react";
import { PlusMinusHandler } from "../../Buttons/PlusMinusHandler";
import { IndividualService } from "../../Calculator/calculator-types";
import { getUnNormalShownPrice } from "../../../utils/getUnNormalShownPrice";
import { addOrUpdateSingleService, getSavedServiceCount } from "../../../utils/sessionStorageMethods";
import stepStore from "../../../stores/step-store";
import { observer } from "mobx-react-lite";
import ServiceWrapper from "../ServiceWrapper/ServiceWrapper";

interface Props {
  serviceStorageName: string
  service: IndividualService
  unNormalPriceChange?: boolean
}

export const SingleServiceItem: React.FC<Props> = observer(
  ({ serviceStorageName, service, unNormalPriceChange }) => {
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
      <ServiceWrapper title={title} description={description}>
        <PlusMinusHandler setPriceСount={setPriceСount} priceСount={priceCount} />
        {unNormalPriceChange && title === 'Kaskadenschaltung'
          ? (<p className="service_price">{getUnNormalShownPrice(price, priceCount)}.00 €</p>)
          : (<p className="service_price">{shownPrice}.00 €</p>)
        }
      </ServiceWrapper>
    );
  })
