/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',

  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-astro'],

  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[./].*layouts/(.*)$',
    '^[./].*components/(.*)$',
    '',
    '^[./].*utils/(.*)$',
    '',
    '^[./]',
    '',
    '^.*\\.(svg|png|jpg|webp|avif)$',
    '',
    '<TYPES>',
  ],
  importOrderTypeScriptVersion: '5.0.0',

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
