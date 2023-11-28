import roleStore, { UserRole } from "../stores/role-store";

interface User {
  login: string;
  password: string;
}

export const getLogIn = (data: User) => {
  console.log("started");
  const ADMIN_LOGIN = "admin";
  const ADMIN_PASSWORD = "88141321";
  const USER_LOGIN = "ne_admin";
  const USER_PASSWORD = "12344321";

  switch (data.login) {
    case ADMIN_LOGIN:
      if (data.password === ADMIN_PASSWORD) {
        roleStore.setRole(UserRole.admin);
      } else {
        console.log("admin no pass");
        roleStore.setRole(UserRole.notLogged);
      }
      break;

    case USER_LOGIN:
      if (data.password === USER_PASSWORD) {
        roleStore.setRole(UserRole.user);
      } else {
        roleStore.setRole(UserRole.notLogged);
      }
      break;

    default:
      roleStore.setRole(UserRole.notLogged);
      return;
  }
};
