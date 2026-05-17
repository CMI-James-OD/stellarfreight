import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  // Override postcss at the Vite level with an empty config so Vite never
  // searches for or loads postcss.config.mjs at startup. Without this, Vite
  // auto-discovers the file and tries to load @tailwindcss/postcss →
  // lightningcss → platform-specific native binary, which is missing from
  // the Windows-generated lockfile on Linux CI runners.
  css: {
    postcss: {},
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    css: false,
  },
});
