import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  base: mode === "production" ? "/Digital-health-solutions/" : "/",
  server: { host: "127.0.0.1", port: 5180, strictPort: true },
}));
