import React from "react";
import "./PvsolFilePage.scss";
import { Header } from "../../components/Header";
import { FileLoaderWindow } from "../../components/FileLoaderWindow";

export const PvsolFilePage: React.FC = () => {
  return (
    <div className="pvsolFilePage">
      <Header />
      <div className="pvsolFilePage__inner">
        <FileLoaderWindow/>
        <ButtonPrev/>
      </div>
    </div>
  );
}
