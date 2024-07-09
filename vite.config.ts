import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const srcDir = "/src";
const assetsDir = srcDir + "/assets";
const componentsDir = srcDir + "/components";
const servicesDir = srcDir + "/services";
const pagesDir = srcDir + "/pages";
const pluginsDir = srcDir + "/plugins";


export default defineConfig({
  resolve: {
    alias: {
      "@src": srcDir,
      "@assets": assetsDir,
      "@components": componentsDir,
      "@services": servicesDir,
      "@pages": pagesDir,
      "@plugins": pluginsDir,
    },
  },
  plugins: [react()],
});
