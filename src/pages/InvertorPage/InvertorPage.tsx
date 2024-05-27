import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { titles } from "./titles";

import "./InvertorPage.scss";
import { observer } from "mobx-react-lite";


export const InvertorPage: React.FC = observer(() => {
  const { producer } = producerStore;
  const title: Title = titles[producer]

  const endpoint = producer === Producer.huawei ? "smartmeters" : "other";

  return (
    <div className="invertorPage">
      <Header />
      <Calculator
        header={title}
        selectsTable="inverters"
        serviceTableName={endpoint}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
