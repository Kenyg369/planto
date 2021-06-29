
const { transformSync } = require("@swc/core");

module.exports = {
  process(src, path, config) {
    const transformed = /(useUtils.ts|config.ts)$/.test(path) ? src.replace("import.meta.env", "process.env") : src;

    const [, , transformOptions = {}] =
      (config.transform || []).find(([, transformerPath]) => transformerPath === __filename) || [];

    if (/\.(t|j)sx?$/.test(path)) {
      return transformSync(transformed, {
        ...transformOptions,
        filename: path,
        jsc: {
          parser: {
            syntax: "typescript",
            dynamicImport: true
          },
          target: "es2015",
          transform: {
            hidden: {
              jest: true
            }
          },
        },
        module: {
          type: "commonjs"
        },
        sourceMaps: true
      });
    }

    return transformed;
  },
};
