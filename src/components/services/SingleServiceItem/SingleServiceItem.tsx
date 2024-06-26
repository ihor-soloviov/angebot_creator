/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PlusMinusHandler } from "../../Buttons/PlusMinusHandler";
import { IndividualService } from "../../../types/calculator-types";
import { getUnNormalShownPrice } from "../../../utils/getUnNormalShownPrice";
import { observer } from "mobx-react-lite";
import ServiceWrapper from "../ServiceWrapper/ServiceWrapper";
import calculatorStore from "../../../stores/calculator-store";
import stepStore from "../../../stores/step-store";

interface Props {
  service: IndividualService
}

export const SingleServiceItem: React.FC<Props> = observer(
  ({ service }) => {
    const { title, description, price, count } = service;
    const { appStep } = stepStore;
    const { updateCount } = calculatorStore;

    const [priceCount, setPriceСount] = useState(count || 0)
    const shownPrice = priceCount === 0 ? 0 : price * priceCount;

    useEffect(() => {
      updateCount(appStep, service, priceCount);
    }, [priceCount, appStep]);

    return (
      <ServiceWrapper title={title} description={description}>
        <>
          <PlusMinusHandler setPriceСount={setPriceСount} priceСount={priceCount} />
          {title === 'Kaskadenschaltung'
            ? (<p className="service_price">{getUnNormalShownPrice(price, priceCount)}.00 €</p>)
            : (<p className="service_price">{shownPrice}.00 €</p>)
          }
        </>
      </ServiceWrapper>
    );
  })
