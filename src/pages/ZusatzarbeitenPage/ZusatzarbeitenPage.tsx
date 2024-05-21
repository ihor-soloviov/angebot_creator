import React, { useCallback, useEffect, useState } from "react";
import "./ZusatzarbeitenPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService } from "../../components/Calculator/calculator-types";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";
import { fetchServicesBySection } from "../../api/fetchItemsFromtable";

export const ZusatzarbeitenPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([]);

  const setServicesBySpecific = useCallback(async () => {
    const { single } = await fetchServicesBySection("Zusatzarbeiten");
    setSingleServices(single);
  }, [setSingleServices]);

  useEffect(() => {
    setServicesBySpecific()
  }, [setServicesBySpecific])

  return (
    <div className="zusatzarbeitenPage">
      <Header />
      <Calculator
        header={{ title: "Zusatzarbeiten", description: "Доп. услуги" }}
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
  );
})
