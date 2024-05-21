import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownServices, IndividualService, Module, ServiceSpecific, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchServicesByTableName } from "../../api/fetchItemsFromtable";
import { titles } from "./titles";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";
import { SelectServiceItem } from "../../components/services/SelectServiceItem";
import "./InvertorPage.scss";
import { observer } from "mobx-react-lite";

export const InvertorPage: React.FC = observer(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<DropdownServices | null>(null)
  const { producer } = producerStore;
  const title: Title = titles[producer]

  const addSelectedService = (service: IndividualService) => {
    setSingleServices(prev => [...prev, service])
  }

  useEffect(() => {
    fetchServicesByTableName("inverters").then(res => {
      const options = res.map((el: Module) => (
        {
          title: el.model,
          price: el.price,
          specific: ServiceSpecific.Select
        }));
      setSelectServices({ options })
    })
    const endpoint = producer === Producer.huawei ? "smartmeters" : "other"
    fetchServicesByTableName(endpoint).then((res) => {
      const services = res.map((el: Module) => (
        {
          title: el.model,
          price: el.price,
          specific: ServiceSpecific.Select
        }));
      setSingleServices(services)
    });
  }, [producer])

  return (
    <div className="invertorPage">
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
          {selectServices && <SelectServiceItem services={selectServices} addSelectedService={addSelectedService} />}
        </CalculatorContainer>
      </Calculator>

      <Footer isCalculator={true} />
    </div>
  );
})
