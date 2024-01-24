import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const sensorSchema = z.object({
  sid: z.string(),
  uid: z.string(),
  name: z.string(),
  isOpen: z.boolean(),
  timestamp: z.instanceof(Timestamp),
  tokens: z.string().array(),
  history: z
    .object({
      isOpen: z.boolean(),
      timestamp: z.instanceof(Timestamp),
    })
    .array(),
});

export type Sensor = z.infer<typeof sensorSchema>;
