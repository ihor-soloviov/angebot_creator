import React, { useEffect, useState } from "react";
import "./WallboxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSingleItems } from "../../api/fetchItemsFromtable";

export const WallboxPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<SingleService[]>([])

  const { producer } = producerStore;

  const title: Title = {
    blackTitle: "Wallbox",
    greyTitle: `(${producer})`
  }

  useEffect(() => {
    if (producer === Producer.enphase) {
      fetchSingleItems("wallbox", setSingleServices, "Pulsar Plus");
      return;
    }
    fetchSingleItems("wallbox", setSingleServices);
  }, [producer])

  return (
    <div className="wallboxPage">
      <Header />
      <Calculator
        title={title}
        singleServices={singleServices}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
