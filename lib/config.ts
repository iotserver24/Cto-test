import { z } from "zod";

const envSchema = z.object({
  AI_MODEL_NAME: z.string().min(1, "AI_MODEL_NAME is required"),
  AI_API_URL: z.string().url("AI_API_URL must be a valid URL"),
  AI_API_KEY: z.string().min(1, "AI_API_KEY is required"),
  WEBCONTAINER_CLIENT_TOKEN: z.string().optional(),
});

type EnvConfig = z.infer<typeof envSchema>;

let validatedEnv: EnvConfig | null = null;

function validateEnv(): EnvConfig {
  if (validatedEnv) {
    return validatedEnv;
  }

  if (typeof window !== "undefined") {
    throw new Error(
      "Config validation should only be called on the server side"
    );
  }

  try {
    validatedEnv = envSchema.parse({
      AI_MODEL_NAME: process.env.AI_MODEL_NAME,
      AI_API_URL: process.env.AI_API_URL,
      AI_API_KEY: process.env.AI_API_KEY,
      WEBCONTAINER_CLIENT_TOKEN: process.env.WEBCONTAINER_CLIENT_TOKEN,
    });
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((issue) => `  - ${String(issue.path[0])}: ${issue.message}`)
        .join("\n");
      throw new Error(
        `Environment validation failed. Please check your .env file:\n${missingVars}`
      );
    }
    throw error;
  }
}

export function getServerConfig() {
  return validateEnv();
}

export function getAIModelName(): string {
  return getServerConfig().AI_MODEL_NAME;
}

export function getAIApiUrl(): string {
  return getServerConfig().AI_API_URL;
}

export function getAIApiKey(): string {
  return getServerConfig().AI_API_KEY;
}

export function getWebContainerClientToken(): string | undefined {
  return getServerConfig().WEBCONTAINER_CLIENT_TOKEN;
}
