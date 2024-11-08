import { atom } from "recoil";

export const placeHolderTextAtom = atom<string>({
  key: "placeHolderTextAtom",
  default: "01012345678",
});
