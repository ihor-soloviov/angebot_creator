import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CustomInput } from "../CustomInput/CustomInput";

import log from "../../assets/log.svg";
import pass from "../../assets/pass.svg";

import { CustomCheckbox } from "../CustomCheckbox";
import arrButton from "../../assets/arrowButton.svg"

import { getLogIn } from "../../api/login";
import "./LoginForm.scss";

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

  const formSubmit = () => {
    if (login && password) {
      getLogIn({ login: login, password: password });

    }
  }

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
          <button onClick={formSubmit} className="buttonNext">
            Далее
            <img src={arrButton} alt="butt" />
          </button>
        </div>
      </div>
    </div>
  );
}
)
