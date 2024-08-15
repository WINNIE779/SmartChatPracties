import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
});
