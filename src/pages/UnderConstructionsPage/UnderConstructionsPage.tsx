/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import "./UnderConstructionsPage.scss";
import { IndividualService, Title } from "../../components/Calculator/calculator-types";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleServiceItem } from "../../components/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";
import { fetchServicesBySection } from "../../api/fetchItemsFromtable";

const title: Title = {
  title: "Unterkonstruktion",
  description: "Подконструкция"
}

export const UnderConstructionsPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([]);

  const setServicesBySpecific = useCallback(async () => {
    const { single } = await fetchServicesBySection("Unterkonstruktion");
    setSingleServices(single);
  }, [setSingleServices]);

  useEffect(() => {
    setServicesBySpecific()
  }, [])

  return (
    <div className="underConstructionsPage">
      <Header />
      <Calculator
        header={title}
      >
        <CalculatorContainer>
          {singleServices.map((service, index) =>
            <SingleServiceItem
              serviceStorageName='singleServices'
              key={index}
              service={service}
              unNormalPriceChange={true}
            />
          )
          }
        </CalculatorContainer>
      </Calculator>
      <Footer isCalculator={true} />
    </div>
  )
})
