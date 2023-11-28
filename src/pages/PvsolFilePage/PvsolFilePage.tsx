import React from "react";
import { Header } from "../../components/Header";
import { FileLoaderWindow } from "../../components/FileLoaderWindow";
import { ButtonPrev } from "../../components/ButtonPrev";
import "./PvsolFilePage.scss";

export const PvsolFilePage: React.FC = () => {
  return (
    <div className="pvsolFilePage">
      <Header />
      <div className="pvsolFilePage__inner">
        <FileLoaderWindow/>
        {/* <ButtonPrev/> */}
      </div>
    </div>
  );
}
