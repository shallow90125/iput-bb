import { FirestoreDataConverter } from "firebase/firestore";
import { z } from "zod";

export function converter<T extends z.AnyZodObject>(
  schema: T,
): FirestoreDataConverter<z.infer<T>> {
  return {
    fromFirestore(snapshot, options) {
      return schema.strict().parse(snapshot.data(options));
    },
    toFirestore(data) {
      return schema.strict().parse(data);
    },
  };
}
