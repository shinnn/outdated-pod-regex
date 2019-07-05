# outdated-pod-regex

[![npm version](https://img.shields.io/npm/v/outdated-pod-regex.svg)](https://www.npmjs.com/package/outdated-pod-regex)
[![Build Status](https://travis-ci.org/shinnn/outdated-pod-regex.svg?branch=master)](https://travis-ci.org/shinnn/outdated-pod-regex)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/outdated-pod-regex.svg)](https://coveralls.io/r/shinnn/outdated-pod-regex)

Create a [regular expression](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10) that matches the outdated [Pod](https://cocoapods.org/) list generated with [`pod outdated`](https://guides.cocoapods.org/terminal/commands.html#pod_outdated) command

```javascript
const stdout = `
- CrittercismSDK 5.3.0 -> 5.3.0 (latest version 5.4.0)
- GCDWebServer 3.2.5 -> 3.2.7 (latest version 3.2.7)
`;

stdout.match(outdatedPodRegex());
//=> ['- CrittercismSDK 5.3.0 -> 5.3.0 (latest version 5.4.0)', '- GCDWebServer 3.2.5 -> 3.2.7 (latest version 3.2.7)']
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install outdated-pod-regex
```

## API

### outdatedPodRegex()

Return: `RegExp` with `g` and `m` flags

```javascript
const stdout = `
- CrittercismSDK 5.3.0 -> 5.3.0 (latest version 5.4.0)
- GCDWebServer 3.2.5 -> 3.2.7 (latest version 3.2.7)
`;

const regex = outdatedPodRegex();

regex.exec(stdout);
//=> ['- CrittercismSDK 5.3.0 -> 5.3.0 (latest version 5.4.0)', 'CrittercismSDK', '5.3.0', '5.3.0', '5.4.0']

regex.exec(stdout);
//=> ['- GCDWebServer 3.2.5 -> 3.2.7 (latest version 3.2.7)', 'GCDWebServer', '3.2.5', '3.2.7', '3.2.7']

regex.exec(stdout);
//=> null
```

## License

[The Unlicense](./LICENSE)
