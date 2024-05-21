import React, { useCallback, useEffect, useState } from "react";
import "./TaubenschutzPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService } from "../../components/Calculator/calculator-types";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";
import { fetchServicesBySection } from "../../api/fetchItemsFromtable";

export const TaubenschutzPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])

  const setServicesBySpecific = useCallback(async () => {
    const { single } = await fetchServicesBySection("Taubenschutz");
    setSingleServices(single);
  }, [setSingleServices]);

  useEffect(() => {
    setServicesBySpecific()
  }, [setServicesBySpecific])

  return (
    <div className="taubenschutzPage">
      <Header />
      <Calculator
        header={{ title: "Taubenschutz", description: "Защита от голубей" }}

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
