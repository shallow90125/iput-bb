import { FirestoreDataConverter } from "firebase/firestore";
import { z } from "zod";
import { withFieldValue } from "./with-field-value";

export function converter<T extends z.AnyZodObject>(
  schema: T,
): FirestoreDataConverter<z.infer<T>> {
  return {
    fromFirestore(snapshot, options) {
      return withFieldValue(schema).strict().parse(snapshot.data(options));
    },
    toFirestore(data) {
      return withFieldValue(schema).strict().parse(data);
    },
  };
}
