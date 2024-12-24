import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
});
