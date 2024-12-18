import { atom } from "recoil";

export interface User {
  birthDate: string;
  name: string;
  phoneNumber: string;
  regionLevel1: string;
  regionLevel2: string;
  churchName: string;
  pastorName: string;
  schoolAndMajor: string;
  companyName: string;
  yourFaith: string;
  influentialVerse: string;
  prayerTopic: string;
  vision: string;
  coupleActivity: string;
  expectedMeeting: string;
  merit: string;
  profileImage: string[];
  idealTypeAge: string;
  idealTypeDistance: number;
  status?: string;
}

export const userAtom = atom<User>({
  key: "userState",
  default: {
    birthDate: "",
    name: "",
    phoneNumber: "",
    regionLevel1: "",
    regionLevel2: "",
    churchName: "",
    pastorName: "",
    schoolAndMajor: "",
    companyName: "",
    yourFaith: "",
    influentialVerse: "",
    prayerTopic: "",
    vision: "",
    coupleActivity: "",
    expectedMeeting: "",
    merit: "",
    profileImage: [],
    idealTypeAge: "",
    idealTypeDistance: 0,
  },
});
