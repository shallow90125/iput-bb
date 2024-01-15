import { z } from "zod";

export const sensorSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  history: z.array(
    z.object({
      timestamp: z.string(),
      open: z.boolean(),
    }),
  ),
});

export type Sensor = z.infer<typeof sensorSchema>;
