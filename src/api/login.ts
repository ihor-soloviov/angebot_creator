import roleStore, { UserRole } from "../stores/role-store";
import stepStore, { Steps } from "../stores/step-store";

interface User {
  login: string;
  password: string;
}

const {setStep} = stepStore;

const updateLocalStorageCredentials = (user: User) => {
  const { login, password } = user;
  console.log("Updating local storage credentials");
  console.log("New login:", login);
  console.log("New password:", password);

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

    setStep(Steps.angebotType);
    roleStore.setRole(UserRole.admin);
    updateLocalStorageCredentials(data);

  } else if (login === USER_LOGIN && password === USER_PASSWORD) {

    setStep(Steps.angebotType);
    roleStore.setRole(UserRole.user);
    updateLocalStorageCredentials(data);
    
  } else {
    alert("Неправильний логін або пароль");
  }
};
