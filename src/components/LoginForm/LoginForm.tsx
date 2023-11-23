import React, { useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";

import log from "../../assets/log.svg";
import pass from "../../assets/pass.svg";

import { CustomCheckbox } from "../CustomCheckbox";
import { ButtonNext } from "../ButtonNext";

import { getLogIn } from "../../api/login";

import "./LoginForm.scss";


export const LoginForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login && password) {
      setIsLoading(true)
      try {
        const { isLogged, role } = await getLogIn({ login: login, password: password })

        //logic to put data in mobx
      } catch (error) {
        setIsLoading(false);
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

  }
  return (
    <div className="welcomePage__login">
      {!isError && (
        <div className="loginForm">
          <h2>Login</h2>
          <h3>Добро пожаловать! Пожалуйста, <br /> войдите в свой аккаунт</h3>
          <form onSubmit={(event) => formSubmit(event)}>
            <CustomInput placeholder="Login" img={log} value={login} setValue={setLogin} />
            <CustomInput placeholder="Password" img={pass} value={password} setValue={setPassword} />
            <CustomCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
            <ButtonNext />
          </form>
        </div>
      )}
      {isLoading && <div>is Loading...</div>}
    </div>
  );
}
