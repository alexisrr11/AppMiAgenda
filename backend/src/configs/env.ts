import "dotenv/config";

const DEFAULT_DEV_JWT_SECRET = "dev_jwt_secret_change_me";

let warnedAboutJwtSecret = false;

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET es obligatorio en producción");
  }

  if (!warnedAboutJwtSecret) {
    console.warn(
      "JWT_SECRET no está definido; usando secreto temporal solo para desarrollo"
    );
    warnedAboutJwtSecret = true;
  }

  return DEFAULT_DEV_JWT_SECRET;
};

export const getPort = (): number => {
  const port = Number(process.env.PORT ?? 3001);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT debe ser un número válido");
  }

  return port;
};
