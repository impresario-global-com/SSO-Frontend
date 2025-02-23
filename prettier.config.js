/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'as-needed',
  bracketSameLine: false,
  jsxSingleQuote: false,
  bracketSpacing: true,

  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
