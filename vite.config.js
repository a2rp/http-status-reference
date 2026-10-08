import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/http-status-reference/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
