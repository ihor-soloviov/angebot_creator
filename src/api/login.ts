import roleStore, { UserRole } from "../stores/role-store";
import stepStore, { AppSteps } from "../stores/step-store";

interface User {
  login: string;
  password: string;
}

const { setStep } = stepStore;

const updateLocalStorageCredentials = (user: User) => {
  const { login, password } = user;

  localStorage.setItem("login", login);
  localStorage.setItem("password", password);
};

export const getLogIn = (data: User) => {
  const ADMIN_LOGIN = "admin";
  const ADMIN_PASSWORD = "88141321";
  const USER_LOGIN = "ne_admin";
  const USER_PASSWORD = "12344321";

  const { login, password } = data;
  // Перевірка логіну та паролю
  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    setStep(AppSteps.angebotType);
    roleStore.setRole(UserRole.admin);
    updateLocalStorageCredentials(data);
  } else if (login === USER_LOGIN && password === USER_PASSWORD) {
    setStep(AppSteps.angebotType);
    roleStore.setRole(UserRole.user);
    updateLocalStorageCredentials(data);
  } else {
    alert("Неправильний логін або пароль");
  }
};

export const logIn = () => {
  setStep(AppSteps.angebotType);
  // updateLocalStorageCredentials(data);
};
