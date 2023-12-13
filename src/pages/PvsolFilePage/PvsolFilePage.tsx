import React, { useState } from "react";
import { Header } from "../../components/Header";
import { FileLoaderWindow } from "../../components/FileLoaderWindow";
import { ButtonPrev } from "../../components/ButtonPrev";
import "./PvsolFilePage.scss";
import { ButtonNext } from "../../components/ButtonNext";

export const PvsolFilePage: React.FC = React.memo(() => {
  const [isDisabled, setIsDisabled] = useState(true)
  return (
    <div className="pvsolFilePage">
      <Header />
      <div className="pvsolFilePage__inner">
        <FileLoaderWindow setIsDisabled={setIsDisabled} />
        <ButtonNext width={394} isDisabled={isDisabled} />
        <ButtonPrev isCalculator={true} />
      </div>
    </div>
  );
})
