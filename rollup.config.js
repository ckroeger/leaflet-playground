import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import css from "rollup-plugin-import-css";

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    name: "bundle",
  },
  plugins: [
    resolve(),
    commonjs(),
    css(
      {
        output: "bundle.css",
      },
      {
        include: ["node_modules/**"],
      }
    ),
    isProduction && terser(),
    !isProduction &&
      serve({
        open: true,
        contentBase: ["public"],
        port: 8080,
      }),
    !isProduction && livereload("public"),
  ],
};
