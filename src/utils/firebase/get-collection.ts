import { collection } from "firebase/firestore";
import { keys } from "../keys";
import { collections } from "./collections";
import { converter } from "./converter";
import { db } from "./init";

export function getCollection<T extends keyof typeof collections>(path: T) {
  return {
    ref: collection(db, path).withConverter(converter(collections[path])),
    path: keys(collections[path]),
  };
}
