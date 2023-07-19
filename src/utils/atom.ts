import { User } from "firebase/auth";
import { atom } from "recoil";

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
  dangerouslyAllowMutability: true,
});

export const sensorsAtom = atom<Sensor[]>({
  key: "sensors",
  default: [],
});

export const authSpinnerAtom = atom<boolean>({
  key: "authSpinner",
  default: false,
});

export const initAtom = atom<boolean>({
  key: "init",
  default: false,
});
