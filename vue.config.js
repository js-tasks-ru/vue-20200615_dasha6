const vueTasks = [
  [3, 1],
  [3, 2],
];

const pages = Object.fromEntries(
  vueTasks.map(([module, task]) => [
    `${module}-module-${task}-task`,
    {
      entry: `./${module}-module/${task}-task/src/main.js`,
      template: `./${module}-module/${task}-task/src/index.html`,
    },
  ]),
);

module.exports = {
  pages,
};
