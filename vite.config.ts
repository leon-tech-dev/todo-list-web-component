import { defineConfig } from "vite";

export default defineConfig({
  base: "/todo-list-web-component/",
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
