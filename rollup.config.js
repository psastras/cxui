import typescript from "rollup-plugin-typescript2";

const isProduction = process.env.BUILD === "production";
const pkg = require("./package.json");
const external = Object.keys(pkg.peerDependencies);

export default {
  input: "lib/index.tsx",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      moduleName: "cxui",
      globals: { react: "React" },
      sourceMap: true
    },
    {
      file: pkg.main,
      format: "cjs",
      globals: { react: "React" },
      sourceMap: true
    },
    {
      file: pkg.module,
      format: "es",
      globals: { react: "React" },
      sourceMap: true
    }
  ],
  external,
  plugins: [typescript({ typescript: require("typescript") })]
};
