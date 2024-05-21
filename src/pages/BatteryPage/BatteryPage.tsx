import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import producerStore from "../../stores/producer-store";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";

import { fetchServicesByTableName } from "../../api/fetchItemsFromtable";

import { DropdownServices, IndividualService, Module, ServiceSpecific, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";

import "./BatteryPage.scss";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";
import { SelectServiceItem } from "../../components/services/SelectServiceItem";

export const BatteryPage: React.FC = observer(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<DropdownServices | null>(null)
  const { producer } = producerStore;
  const title: Title = titles[producer];

  const addSelectedService = (service: IndividualService) => {
    setSingleServices(prev => [...prev, service])
  }

  useEffect(() => {
    fetchServicesByTableName("batteries").then(res => {
      const options = res.map(
        (el: Module) => ({ title: el.model, price: el.price, specific: ServiceSpecific.Select })
      );
      setSelectServices({ options })
    })
  }, [producer])

  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        header={title}
      >
        <CalculatorContainer>
          {singleServices && singleServices.map(el => (
            <React.Fragment key={el.title}>
              <SingleServiceItem
                service={el}
                serviceStorageName="batteries"
              />
            </React.Fragment>
          ))}
          {selectServices &&
            <SelectServiceItem
              services={selectServices}
              addSelectedService={addSelectedService}
            />
          }
        </CalculatorContainer>
      </Calculator>
      <Footer isCalculator={true} />
    </div>
  );
})
