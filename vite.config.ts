import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    // basicSsl(),
  ],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
  },
});
