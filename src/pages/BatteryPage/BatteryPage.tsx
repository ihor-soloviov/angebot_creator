import React from "react";
import { observer } from "mobx-react-lite";
import producerStore from "../../stores/producer-store";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";

import { Title } from "../../types/calculator-types";
import { titles } from "./titles";
import "./BatteryPage.scss";

export const BatteryPage: React.FC = observer(() => {
  const { producer } = producerStore;
  const title: Title = titles[producer];

  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        header={title}
        selectsTable="batteries"
      />
      <Footer isCalculator={true} />
    </div>
  );
})
