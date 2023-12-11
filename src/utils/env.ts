import { z } from "zod";

const varSchema = z.string().min(1);

const envSchema = z.object({
  NEXTAUTH_SECRET: varSchema,
  NEXT_PUBLIC_API_KEY: varSchema,
  NEXT_PUBLIC_AUTH_DOMAIN: varSchema,
  NEXT_PUBLIC_PROJECT_ID: varSchema,
  NEXT_PUBLIC_STORAGE_BUCKET: varSchema,
  NEXT_PUBLIC_MESSAGING_SENDER_ID: varSchema,
  NEXT_PUBLIC_APP_ID: varSchema,
  NEXT_PUBLIC_MEASUREMENT_ID: varSchema,
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
