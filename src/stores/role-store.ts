import { makeAutoObservable } from "mobx";
export enum UserRole {
  admin = "admin",
  user = "user",
  notLogged = "",
}

class RoleStore {
  role: UserRole = UserRole.notLogged;

  constructor() {
    makeAutoObservable(this);
    this.setRoleFromLS();
  }

  setRole = (value: UserRole) => {
    if (value) {
      this.role = value;
    }
  };

  setRoleFromLS = () => {
    const role = localStorage.getItem("login");
    if (role && role in UserRole) {
      this.role = role as UserRole;
    }
  };
}

export default new RoleStore();
