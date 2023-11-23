import { makeAutoObservable } from "mobx";
enum UserRole {
  admin = "admin",
  user = "user",
  notLogged = "",
}

class RoleStore {
  role: UserRole = UserRole.notLogged;

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (value: UserRole) => {
    if (value) {
      this.role = value;
    }
  };
}

export default new RoleStore();
