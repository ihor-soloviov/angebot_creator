import React, { useEffect, useState } from "react";
import "./WallboxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSingleItems } from "../../api/fetchItemsFromtable";
import { SingleServiceItem } from "../../components/SingleServiceItem";

export const WallboxPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])

  const { producer } = producerStore;

  const title: Title = {
    title: "Wallbox",
    description: `(${producer})`
  }

  useEffect(() => {
    if (producer === Producer.enphase) {
      fetchSingleItems("wallbox", "Pulsar Plus").then(res => setSingleServices(res));
      return;
    }
    fetchSingleItems("wallbox").then(res => setSingleServices(res));
  }, [producer])

  return (
    <div className="wallboxPage">
      <Header />
      <Calculator
        header={title}

      >
        {singleServices.map((service, index) =>
          <SingleServiceItem
            serviceStorageName='singleServices'
            key={index}
            service={service}
            setTotalPrice={() => console.log('e')}
            unNormalPriceChange={true}
          />
        )
        }
      </Calculator>
      <Footer isCalculator={true} />
    </div>
  );
})
