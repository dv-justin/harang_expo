import { atom } from "recoil";

export const authCompleteButtonAtom = atom<boolean>({
  key: "authCompleteButtonAtom",
  default: false,
});
