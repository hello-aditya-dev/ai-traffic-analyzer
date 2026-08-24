/**
 * Central application configuration.
 * Values resolve from environment variables with sensible defaults so the
 * product runs out-of-the-box with `AI_PROVIDER=mock` and no API key.
 */

function num(key: string, fallback: number): number {
  const v = process.env[key];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function str(key: string, fallback: string): string {
  const v = process.env[key];
  return v === undefined || v === "" ? fallback : v;
}

export const config = {
  /** Active AI vision provider: mock | generic-http | local-inference */
  aiProvider: str("AI_PROVIDER", "mock"),
  aiApiBaseUrl: str("AI_API_BASE_URL", ""),
  aiApiKey: str("AI_API_KEY", ""),
  aiModel: str("AI_MODEL", ""),

  videoStoragePath: str("VIDEO_STORAGE_PATH", "./storage/videos"),
  outputStoragePath: str("OUTPUT_STORAGE_PATH", "./storage/outputs"),
  maxUploadMb: num("MAX_UPLOAD_MB", 1024),
  defaultFrameRate: num("DEFAULT_FRAME_RATE", 2),
  databaseUrl: str("DATABASE_URL", "file:./db/custom.db"),

  /** App metadata */
  appVersion: "1.0.0",
  environment: str("NODE_ENV", "development"),
} as const;

export type AppConfig = typeof config;
