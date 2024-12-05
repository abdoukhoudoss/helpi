import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.insee.fr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          // Ajouter le token d'autorisation à toutes les requêtes
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader(
              "Authorization",
              `Bearer ${process.env.VITE_API_SIRENE_KEY}`,
            );
          });
        },
      },
    },
  },
});
