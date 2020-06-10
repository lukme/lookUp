module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "plugin:react/recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 11,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "import",
    ],
    "rules": {
        "react/prop-types": "off",
        "object-curly-spacing": [
            "warn",
            "always",
        ],
        "import/order": [
            "warn", {
                "groups": ["external", "internal"],
            }
        ],
        "no-var": "warn",
        "eqeqeq": "warn",
        "no-console": [
            "warn", {
                allow: ["warn", "error"],
            }
        ],
        "semi": [
            "warn",
            "always",
            {
                "omitLastInOneLineBlock": true,
            }
        ],
        "no-extra-semi": "warn",
        "default-case": "warn",
        "react/no-unknown-property": "warn",
        "no-empty-function": "warn",
        "no-multi-spaces": "warn",
        "no-useless-return": "error",
        "no-undef-init": "error",
    }
};