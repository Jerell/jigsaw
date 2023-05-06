export default {
  // Prettiers supported file list is too long,
  // so just throw everything at it and let it
  // decide what not to read using -u
  '**/*': ['npx prettier -w -u'],
  'frontend/src/**/*': () => ['npx -w frontend next lint --fix'],
};
