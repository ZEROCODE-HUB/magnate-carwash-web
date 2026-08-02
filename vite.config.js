import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// App del ADMIN — corre en el puerto 5174 (distinto al de client-app)
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
});
