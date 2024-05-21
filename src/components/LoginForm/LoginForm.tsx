import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CustomInput } from "../Inputs/CustomInput/CustomInput";

import log from "../../assets/log.svg";
import pass from "../../assets/pass.svg";

import { CustomCheckbox } from "../Inputs/CustomCheckbox";
import arrButton from "../../assets/arrowButton.svg"

import "./LoginForm.scss";
import { Link } from "react-router-dom";
import { logIn } from "../../api/login";

export const LoginForm: React.FC = observer(() => {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const checkLocalStorageCredentials = () => {

    const storedLogin = localStorage.getItem('login');
    const storedPassword = localStorage.getItem('password');

    if (storedLogin === null || storedPassword === null) {
      return;
    }
    setLogin(storedLogin);
    setPassword(storedPassword);
  };

  useEffect(() => {
    checkLocalStorageCredentials();
  }, [])


  return (
    <div className="welcomePage__login">
      <div className="loginForm">
        <h2>Login</h2>
        <h3>Добро пожаловать! Пожалуйста, <br /> войдите в свой аккаунт</h3>
        <div className="welcomePage__form">
          <CustomInput placeholder="Login" img={log} value={login} setValue={setLogin} />
          <CustomInput placeholder="Password" img={pass} value={password} setValue={setPassword} />
          <CustomCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
          <Link to="/angebotCreator" onClick={logIn} className="buttonNext">
            Далее
            <img src={arrButton} alt="butt" />
          </Link>
        </div>
      </div>
    </div>
  );
}
)
