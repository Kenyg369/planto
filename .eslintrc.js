module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  parser: "vue-eslint-parser",
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:jest/recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: ["tsconfig.json", "tsconfig.eslint.json"],
    sourceType: "module",
    projectFolderIgnoreList: ["test"],
    extraFileExtensions: [".vue"]
  },
  ignorePatterns: [
    "dist/*",
    "coverage/*",
    "tests/automation/cypress/*",
    "node_modules",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/interface-name-prefix": "off",

    // Semicolons
    "@typescript-eslint/semi": ["error", "always"],
    // "semi": "off",

    // Indentation
    "@typescript-eslint/indent": ["error", 2,
      {
        "ArrayExpression": 1,
        "CallExpression": { "arguments": 1 },
        "FunctionExpression": { "body": 1, "parameters": 2 },
        "SwitchCase": 1
      }],
    "indent": "off",
    "no-tabs": ["error"],
    "no-mixed-spaces-and-tabs": ["error"],

    // Strings
    "@typescript-eslint/quotes": ["error", "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "quotes": "off",
    "max-len": ["error", {
      "code": 150,
      "ignoreComments": true,
      "ignoreRegExpLiterals": true,
      "ignoreTemplateLiterals": true
    }],
    "prefer-template": "error",
    "template-curly-spacing": "error",
    "no-eval": "error",
    "no-useless-escape": "error",
    "no-multi-str": "error",

    // Whitespace
    "space-before-blocks": "error",
    "keyword-spacing": ["error"],
    "space-infix-ops": ["error"],
    "eol-last": ["error", "always"],
    "newline-per-chained-call": "off",
    "no-whitespace-before-property": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" }],
    "padded-blocks": ["error", { "classes": "never", "blocks": "never" }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "space-in-parens": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "block-spacing": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "computed-property-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false }],
    "no-trailing-spaces": "error",
    "rest-spread-spacing": ["error", "never"],
    "semi-spacing": "error",
    "space-unary-ops": "error",
    "no-multi-spaces": "error",
    "no-irregular-whitespace": "error",

    // Variables
    "no-undef": "error",
    "prefer-const": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "max-statements-per-line": ["error", { "max": 2 }],
    "operator-linebreak": ["error", "after"],
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      "caughtErrors": "none",
      "ignoreRestSiblings": false
    }],
    "no-unused-vars": "off",

    // Comments
    "spaced-comment": "error",
    "lines-around-comment": ["error", { "beforeBlockComment": true }],

    // Comparison
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    "no-mixed-operators": "error",
    "yoda": "error",

    // Blocks
    "curly": "error",
    "@typescript-eslint/brace-style": [
      "error",
      "stroustrup",
      { "allowSingleLine": true }
    ],
    "brace-style": "off",
    "no-else-return": "error",
    "no-unreachable": "error",

    // Commas
    "comma-style": ["error", "last"],
    "comma-dangle": "off",

    // Type casting & Coercion
    "no-new-wrappers": "error",

    // Naming-conventions
    "camelcase": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "consistent-type-assertions": "off",
    "consistent-this": "off",

    // Vue
    "vue/html-indent": "error",
    "vue/no-v-html": "error",
    "vue/require-default-prop": "off",
    "vue/v-slot-style": ["error", {
      "atComponent": "v-slot",
      "default": "longform",
      "named": "longform",
    }],

    // Should be enabled for Vue 3.0
    "vue/no-deprecated-v-on-native-modifier": "off",
    "vue/no-deprecated-filter": "off",
    "vue/no-v-model-argument": "off",
    "vue/no-deprecated-v-bind-sync": "off",
    "vue/no-deprecated-props-default-this": "off",
    "vue/experimental-script-setup-vars": "off",

    // Misc
    "object-curly-newline": ["error", { "consistent": true, "multiline": true }],
    "no-throw-literal": "error",
    "no-path-concat": "error",
    "dot-location": ["error", "property"],
    "no-eq-null": "error",
    "no-implicit-coercion": "error",
    "no-lone-blocks": "error",
    "no-new": "error",
    "no-delete-var": "error",
    "global-require": "off",
    "multiline-ternary": ["error", "always-multiline"],
    "no-lonely-if": ["error"],
    "no-case-declarations": "off",
    "no-async-promise-executor": "off",
    "no-prototype-builtins": "off",

    // TypeScript
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "comma",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      },
      "overrides": {
        "interface": {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          }
        }
      }
    }],
    "@typescript-eslint/member-ordering": ["error", { "default": ["signature", "field", "constructor", "method"] }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": null,
        "prefix": ["is", "should", "has", "can", "did", "will"]
      },
      {
        "selector": "variable",
        "format": ["PascalCase", "camelCase", "UPPER_CASE"],
        "leadingUnderscore": 'allow'
      },
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require"
      }
    ],
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-var-requires": "off", // Turned off to not cause avalanche
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
    "space-before-function-paren": "off",
    "@typescript-eslint/no-empty-interface": ["error"],
    "@typescript-eslint/no-misused-new": ["error"],
    "@typescript-eslint/no-misused-promises": ["error"],
    "@typescript-eslint/no-throw-literal": ["error"],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
    "@typescript-eslint/prefer-includes": ["error"],
    "@typescript-eslint/prefer-nullish-coalescing": ["error", { "forceSuggestionFixer": true }],
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": ["off"],
    "@typescript-eslint/prefer-regexp-exec": ["error"],
    "@typescript-eslint/require-array-sort-compare": ["error"],
    "@typescript-eslint/default-param-last": ["error"],
    "@typescript-eslint/no-empty-function": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-extra-parens": ["error", "all", { "nestedBinaryExpressions": false }],
    "no-unused-expressions": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/require-await": "off",
    "require-await": "off",
    "@typescript-eslint/unbound-method": [
      "error", {
        "ignoreStatic": true
      }
    ],
    "@typescript-eslint/no-this-alias": [
      "error", {
        "allowedNames": ["that", "context"]
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "error", {
      "accessibility": "explicit",
      "overrides": {
        "constructors": "no-public"
      }}],
      "@typescript-eslint/explicit-function-return-type": "error",

    // turned off to avoid not-ts file problems
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // To consider going forward
    "new-cap": ["error", {
      "newIsCap": true,
      "capIsNewExceptions": ["AddDetail", "RabbitTransport", "Router", "SendResponse", "SendStatus"],
      "properties": false
    }]
  },
  "overrides": [
    {
     "files": ["*.vue"],
        "rules": {
           "no-unused-vars": "off",
           "@typescript-eslint/no-unused-vars": "off"
        }
    }
   ]
}
