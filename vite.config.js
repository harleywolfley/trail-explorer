import { resolve } from "node:path";
import { defineConfig } from "vite";

/*
  Vite Configuration
  ------------------
  This project has more than one HTML page:
  - index.html is the home page.
  - design-documents.html is linked from the footer.

  By listing both files here, Vite includes both pages when we run:
  npm run build

  That also means npm run preview can show the design document link.
*/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        favorites: resolve(__dirname, "favorites.html"),
        designDocuments: resolve(__dirname, "design.html"),
      },
    },
  },
});
