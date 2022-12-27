import { buildSync } from "esbuild";
import { getFilesRecursive } from "./getFilesRecursive.js";

const srcFiles = [];
getFilesRecursive("src", srcFiles);

buildSync({
  entryPoints: srcFiles,
  bundle: false,
  format: "esm",
  outdir: "build"
});
