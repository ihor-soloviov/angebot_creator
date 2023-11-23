import React from "react";
import { LoginForm } from "../../components/LoginForm";
import wbp from "../../assets/welcomeBackPicture.webp"
import "./WelcomePage.scss";

export const WelcomePage: React.FC = () => {
  return (
    <div className="welcomePage">
      <div className="welcomePage__inner">
        <div className="welcomePage__imageBlock">
          <h1>Welcome <br /> back!</h1>
          <img src={wbp} alt="girls looks on some papers" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
