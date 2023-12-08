import React, { useEffect, useState } from "react";
import "./BatteryPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import producerStore, { Producer } from "../../stores/producer-store";
import { SelectService, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";
import { fetchSelectItems } from "../../api/fetchItemsFromtable";
import { Steps } from "../../stores/step-store";

export const BatteryPage: React.FC = () => {
  const [selectServices, setSelectServices] = useState<SelectService[]>([])
  const { producer } = producerStore;
  const title: Title = titles[producer];

  const nextStep = producer === Producer.huawei ? Steps.wallbox : Steps.iqCombiner

  useEffect(() => {
    fetchSelectItems("batteries", setSelectServices);
  }, [producer])

  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        title={title}
        selectServices={selectServices}
        nextStepEnum={nextStep}
      />
      <Footer />
    </div>
  );
}
