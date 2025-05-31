import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend Next.js core web vitals and disable problematic rules
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable the rule causing build errors with apostrophes
      "react/no-unescaped-entities": "off",
      // Add any other rules to disable here
    }
  }
];

export default eslintConfig;
