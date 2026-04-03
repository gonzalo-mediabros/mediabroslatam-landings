import { defineConfig } from "astro/config";


/*
* DEPLOY GITHUB PAGES DOMINIO TEMPORAL
*/
let DEPLOY_DOMAIN = "https://gonzalo-mediabros.github.io"; 
let DEPLOY_PATH = "/mediabroslatam-landings/";   

/* ⚠️ DESCOMENTAR Y COMPLETAR SI DEPLOY ES UN CUSTOM DOMAIN ⚠️ */

// DEPLOY_DOMAIN = "https://lightmanglobal.com";
// DEPLOY_PATH = "/";


export default defineConfig({
  site: DEPLOY_DOMAIN,
  base: DEPLOY_PATH,
  build: {
    assets: "assets",
  },
});

// EJEMPLO URL https://gonzalo-mediabros.github.io/mediabroslatam-landings/
