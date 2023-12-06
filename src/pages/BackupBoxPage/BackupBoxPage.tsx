import React, { useEffect, useState } from "react";
import "./BackupBoxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService } from "../../components/Calculator/calculator-types";
import producerStore from "../../stores/producer-store";
import { fetchSingleItems } from "../../api/fetchItemsFromtable";

export const BackupBoxPage: React.FC = () => {
  const [singleServices, setSingleServices] = useState<SingleService[]>([]);

  const { producer } = producerStore;

  useEffect(() => {
    fetchSingleItems("other", setSingleServices)

  }, [producer])

  return (
    <div className="backupBoxPage">
      <Header />
      <Calculator
        title={{ greyTitle: "Решение для аварийного электроснабжения", blackTitle: "Notstromlösung" }}
        singleServices={singleServices}
      />
      <Footer />
    </div>
  );
}
