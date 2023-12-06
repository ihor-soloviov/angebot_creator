import React, { useEffect, useState } from "react";
import "./BatteryPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import producerStore, { Producer } from "../../stores/producer-store";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";
import { fetchSelectItems } from "../../api/fetchItemsFromtable";

export const BatteryPage: React.FC = () => {
  const [singleServices, setSingleServices] = useState<SingleService[]>([])
  const [selectServices, setSelectServices] = useState<SelectService[]>([])
  const { producer } = producerStore;
  const title: Title = titles[producer];

  useEffect(() => {
    fetchSelectItems("batteries", setSelectServices);
    if (producer === Producer.tigo) {
      const 
      setSingleServices([{ blackTitle: "Battery Accesorries", greyTitle: "(аксессуары для аккумуляторов)", price: 230 }])
    }
  }, [producer])



  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        title={title}
        singleServices={singleServices}
        selectServices={selectServices}
      />
      <Footer />
    </div>
  );
}
