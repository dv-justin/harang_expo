import { atom } from "recoil";

export const authButtonAtom = atom<boolean>({
  key: "authButtonAtom",
  default: false,
});
