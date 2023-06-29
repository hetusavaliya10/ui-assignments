import { atom } from "jotai";

export const STATUS = atom("available");
export const SEARCH = atom("");
export const PETLIST = atom([]);
export const PETLISTFILTER = atom([]);
export const PETLOADER = atom(false);
export const PETMODAL = atom(false);
export const PETDATA = atom({
  id: +new Date(),
  category: {
    id: +new Date() + 1,
    name: "",
  },
  name: "",
  photoUrls: [],
  tags: [
    {
      id: +new Date() + 2,
      name: "",
    },
    {
      id: +new Date() + 3,
      name: "",
    },
    {
      id: +new Date() + 3,
      name: "pet-care",
    },
  ],
  status: "available",
});
export const PETEDITDATA = atom();
