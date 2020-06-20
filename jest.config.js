const config = {
  preset: '@vue/cli-plugin-unit-jest',
  modulePaths: ['utility_modules'],
};

if (process.env.CI) {
  Object.assign(config, {
    testResultsProcessor:
      './utility_modules/taskbook-test-results-processor.js',
    reporters: [],
  });
}

module.exports = config;
