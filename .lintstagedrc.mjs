export default {
  // Prettiers supported file list is too long,
  // so just throw everything at it and let it
  // decide what not to read using -u
  '**/*': ['npx prettier -u'],
  'frontend/src/**/*': () => ['npm run pretty'],
};
