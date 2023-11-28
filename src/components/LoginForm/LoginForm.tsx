import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CustomInput } from "../CustomInput/CustomInput";

import log from "../../assets/log.svg";
import pass from "../../assets/pass.svg";

import { CustomCheckbox } from "../CustomCheckbox";
import { ButtonNext } from "../ButtonNext";

import { getLogIn } from "../../api/login";
import "./LoginForm.scss";
import roleStore, { UserRole } from "../../stores/role-store";
import stepStore from "../../stores/step-store";


export const LoginForm: React.FC = observer(() => {
  const { role } = roleStore;
  const { setStep } = stepStore;

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login && password) {
      getLogIn({ login: login, password: password });
    }
  }

  useEffect(() => {
    if (role === UserRole.admin || role === UserRole.user) {
      setStep(2)
    }
  }, [role, setStep])


  return (
    <div className="welcomePage__login">
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
    </div>
  );
}
)
