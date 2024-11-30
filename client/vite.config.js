import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa"; // Import the PWA plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "ShelfShare",
        short_name: "ShelfShare",
        description: "A community-driven platform for book sharing.",
        theme_color: "#1976d2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        // icons: [
        //   {
        //     src: "/icon-192x192.png",
        //     sizes: "192x192",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/icon-512x512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //   },
        // ],
      },
      // registerType: "autoUpdate", // Auto-update the service worker
    }),
  ],
});
