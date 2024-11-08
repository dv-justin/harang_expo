import { atom } from "recoil";

export const phoneNumberAtom = atom<string>({
  key: "phoneNumberAtom",
  default: "",
});
