import { z } from "zod";

type Keys<T extends z.AnyZodObject> = {
  [K in keyof T["shape"]]: T["shape"][K] extends z.AnyZodObject
    ? Keys<T["shape"][K]>
    : T["shape"][K]["element"] extends z.AnyZodObject
      ? Keys<T["shape"][K]["element"]>
      : string;
};

export function keys<T extends z.AnyZodObject>(schema: T): Keys<T> {
  return Object.assign(
    {},
    ...Object.keys(schema.shape).map((key) => {
      console.log(`${key}: ${typeof schema.shape[key]}`);
      if (schema.shape[key]["shape"]) {
        return { [key]: keys(schema.shape[key]) };
      } else if (schema.shape[key]["element"]) {
        return { [key]: keys(schema.shape[key]["element"]) };
      } else {
        return { [key]: key };
      }
    }),
  );
}
