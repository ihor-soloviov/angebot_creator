import React, { useEffect, useState } from "react";
import "./BatteryPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import producerStore from "../../stores/producer-store";
import { SelectService, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";
import { fetchSelectItems } from "../../api/fetchItemsFromtable";

export const BatteryPage: React.FC = () => {
  const [selectServices, setSelectServices] = useState<SelectService[]>([])
  const { producer } = producerStore;
  const title: Title = titles[producer];

  useEffect(() => {
    fetchSelectItems("batteries", setSelectServices);
  }, [producer])

  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        title={title}
        selectServices={selectServices}
      />
      <Footer />
    </div>
  );
}
