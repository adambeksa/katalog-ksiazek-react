import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Pliki XML Wolnych Lektur nie mają CORS - na produkcji to samo robi rewrite w vercel.json
    proxy: {
      "/wl-xml": {
        target: "https://wolnelektury.pl",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wl-xml/, "/media/book/xml"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/styles/_variables.scss" as *;
          @use "/src/styles/_mixins.scss" as *;
        `,
      },
    },
  },
});
