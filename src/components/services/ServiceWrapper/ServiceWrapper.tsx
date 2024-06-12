import React, { ReactElement } from "react";
import { Title } from "../../../types/calculator-types";
import "./ServiceWrapper.scss";

interface Props extends Title {
  children: ReactElement
}

const ServiceWrapper: React.FC<Props> = ({ title, description, children }) => {

  return (
    <div className="serviceWrapper">
      <div className="serviceWrapper__info">
        <b>{title}</b>
        <p>{description}</p>
      </div>
      <div className="serviceWrapper__controll">
        {children}
      </div>
    </div>
  )
}

export default ServiceWrapper
