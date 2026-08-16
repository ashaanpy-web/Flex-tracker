import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 👈 Tailwind v4 ka official Vite plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Is se Tailwind aap ke saare components ko scan karna shuru kar dega
  ],
});
