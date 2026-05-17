import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // Disable CSS processing — prevents vitest from loading postcss.config.mjs
    // and pulling in platform-specific native binaries (lightningcss, rollup)
    // that are absent from a Windows-generated package-lock.json on Linux runners.
    css: false,
  },
});
