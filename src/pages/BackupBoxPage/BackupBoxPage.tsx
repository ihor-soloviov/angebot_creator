import React, { useEffect, useState } from "react";
import "./BackupBoxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService } from "../../components/Calculator/calculator-types";
import producerStore from "../../stores/producer-store";
import { fetchSingleItems } from "../../api/fetchItemsFromtable";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";

export const BackupBoxPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([]);

  const { producer } = producerStore;

  const setServicesFromServer = async () => {
    const singleServices = await fetchSingleItems("other");
    if (!singleServices) {
      return;
    }
    setSingleServices(singleServices)
  }

  useEffect(() => {
    setServicesFromServer()
  }, [producer])

  return (
    <div className="backupBoxPage">
      <Header />
      <Calculator
        header={{ description: "Решение для аварийного электроснабжения", title: "Notstromlösung" }}
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
