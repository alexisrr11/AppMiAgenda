import "./configs/env.js";
import app from "./app.js";
import { getPort } from "./configs/env.js";
import { initDb } from "./configs/initDb.js";

try {
  await initDb();

  const PORT = getPort();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en Puerto: ${PORT}`);
  });
} catch (error) {
  console.error("Error iniciando el servidor:", error);
  process.exit(1);
}
