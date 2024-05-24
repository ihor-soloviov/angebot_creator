import React from "react";
import "./BackupBoxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";


export const BackupBoxPage: React.FC = React.memo(() => (
  <div className="backupBoxPage">
    <Header />
    <Calculator
      header={{ description: "Решение для аварийного электроснабжения", title: "Notstromlösung" }}
      serviceTableName="other"
    />
    <Footer isCalculator={true} />
  </div>
))