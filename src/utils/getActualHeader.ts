import { partitions } from "../imports";

export const getActualHeader = (pathname: string) =>
  partitions.find((el) => el.href === pathname.split("/").reverse()[0]);
