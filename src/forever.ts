import { Monitor } from 'forever-monitor';

var child = new Monitor('dist/src/index.js', {
  max: 1,
  silent: false,
});

child.start();
