import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const historySchema = z.object({
  sid: z.string(),
  isOpen: z.boolean(),
  timestamp: z.instanceof(Timestamp),
});

export type History = z.infer<typeof historySchema>;
