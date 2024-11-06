const config = {
  // Type check, Lint & Prettify TS files
  '**/*.(ts|tsx)': filenames => [
    'yarn tsc --noEmit',
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
};

export default config;