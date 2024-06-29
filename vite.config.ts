import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const srcDir = "/src";
const assetsDir = srcDir + "/assets";
const componentsDir = srcDir + "/components";
const servicesDir = srcDir + "/services";

export default defineConfig({
  resolve: {
    alias: {
      "@src": srcDir,
      "@assets": assetsDir,
      "@components": componentsDir,
      "@services": servicesDir,
    },
  },
  plugins: [react()],
});
