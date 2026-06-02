import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string({
    required_error: "DATABASE_URL is required",
  }),
  CORS_ORIGINS: z.string().optional(),
  SALT_ROUNDS: z.string().default("12"),
  JWT_SECRET: z.string({
    required_error: "JWT_SECRET is required",
  }),
  JWT_REFRESH_SECRET: z.string({
    required_error: "JWT_REFRESH_SECRET is required",
  }),
  JWT_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("365d"),
  DEFAULT_ADMIN_PASSWORD: z.string().optional(),
  OPEN_AI_KEY: z.string().optional(),
  UNSPLASH_KEY_API: z.string().optional(),
  UNSPLASH_KEY_API_SECRET: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  VERIFY_EMAIL: z.string().optional(),
  VERIFY_PASSWORD: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
});

const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
  console.error("❌ Invalid environment variables:", envVars.error.format());
  throw new Error("Invalid environment variables");
}

const config = envVars.data;

const parseCorsOrigins = (raw: string | undefined): string[] | undefined => {
  if (!raw?.trim()) return undefined;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

export default {
  env: config.NODE_ENV,
  port: config.PORT,
  database_url: config.DATABASE_URL,
  cors_origins: parseCorsOrigins(config.CORS_ORIGINS),
  bcrypt_salt_rounds: config.SALT_ROUNDS,
  jwt: {
    secret: config.JWT_SECRET,
    refresh_secret: config.JWT_REFRESH_SECRET,
    expires_in: config.JWT_EXPIRES_IN,
    refresh_expires_in: config.JWT_REFRESH_EXPIRES_IN,
  },
  default_admin_password: config.DEFAULT_ADMIN_PASSWORD,
  openai_key: config.OPEN_AI_KEY,
  unsplash_key_api: config.UNSPLASH_KEY_API,
  unsplash_secret_key_api: config.UNSPLASH_KEY_API_SECRET,
  gemini_api_key: config.GEMINI_API_KEY,
  verify_email: config.VERIFY_EMAIL,
  verify_password: config.VERIFY_PASSWORD,
  google_client_id: config.GOOGLE_CLIENT_ID,
};
