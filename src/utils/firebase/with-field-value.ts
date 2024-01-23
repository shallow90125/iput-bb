import { FieldValue } from "firebase/firestore";
import { z } from "zod";

const fieldValueSchema = z.custom<FieldValue>((v) => v instanceof FieldValue);

export function withFieldValue<T extends z.AnyZodObject>(schema: T) {
  let d: z.AnyZodObject = schema;

  for (const v in schema.shape) {
    const property = schema.shape[v];

    if (property instanceof z.ZodObject) {
      d = d.merge(
        z.object({
          [v]: z.union([fieldValueSchema, withFieldValue(property)]),
        }),
      );
      break;
    }

    if (property instanceof z.ZodArray) {
      if (property.element instanceof z.ZodObject) {
        d = d.merge(
          z.object({
            [v]: z.union([
              fieldValueSchema,
              z.array(property.element.merge(withFieldValue(property.element))),
            ]),
          }),
        );
        break;
      }

      d = d.merge(
        z.object({
          [v]: z.union([
            fieldValueSchema,
            z.array(z.union([fieldValueSchema, property.element])),
          ]),
        }),
      );
      break;
    }

    d = d.merge(
      z.object({
        [v]: z.union([fieldValueSchema, property]),
      }),
    );
    break;
  }

  return d;
}
