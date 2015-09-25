'use strong';

const test = require('tape');

const fixture = `
Updating spec repo \`master\`
Updating spec repo \`outdated-pod-regex\`
Analyzing dependencies
The following pod updates are available:
- Foo 4.12.1 -> 4.12.1 (latest version 4.15.0)
- bax+qux 2.8.3 -> (unused) (latest version 2.9.0)
`;

function runTest(description, outdatedPodRegex) {
  test(description, t => {
    t.plan(7);

    t.equal(outdatedPodRegex.name, 'outdatedPodRegex', 'should have a function name.');

    const regex = outdatedPodRegex();

    t.deepEqual(
      Array.from(regex.exec(fixture)),
      ['- Foo 4.12.1 -> 4.12.1 (latest version 4.15.0)', 'Foo', '4.12.1', '4.12.1', '4.15.0'],
      'should return a regex that detects outdated Pods from `pod outdated`.'
    );

    t.deepEqual(
      Array.from(regex.exec(fixture)),
      ['- bax+qux 2.8.3 -> (unused) (latest version 2.9.0)', 'bax+qux', '2.8.3', '(unused)', '2.9.0'],
      'should return a regex with "g" and "m" flags.'
    );

    t.strictEqual(
      outdatedPodRegex().exec('- .foo 2.8.3 -> 4.12.1 (latest version 2.9.0)'),
      null,
      'should return a regex that doesn\'t match the line with a dot-first Pod name.'
    );

    t.strictEqual(
      outdatedPodRegex().exec('- f/oo 2.8.3 -> 4.12.1 (latest version 2.9.0)'),
      null,
      'should return a regex that doesn\'t match the line with a Pod name including `/`.'
    );

    t.strictEqual(
      outdatedPodRegex().exec('- f oo 2.8.3 -> 4.12.1 (latest version 2.9.0)'),
      null,
      'should return a regex that doesn\'t match the line with a Pod name including white spaces.'
    );

    t.strictEqual(
      outdatedPodRegex().exec('- foo 2. 8.3 -> 4.12.1 (latest version 2.9.0)'),
      null,
      'should return a regex that doesn\'t match the line with an invalid version number.'
    );
  });
}

runTest('require(\'outdated-pod-regex\')', require('.'));

global.window = {};
require(`./${require('./bower.json').main}`);

runTest('window.outdatedPodRegex', global.window.outdatedPodRegex);
