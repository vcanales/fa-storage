# fake-storage

This library is exported as commonJS module, however it works in browser environments.

contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

## Installation

using npm

```
npm install --save fa-storage
```

## Usage

In a javascript file with browserify/webpack/rollup

```javascript
/*
  it exposes sessionStorage and localStorage

  the mock process is at follows:

  - native session/local storage
  - cookie storage
  - in memory storage
*/
const faStorage = require('fa-storage');
const sessionStorageMock = faStorage.sessionStorage;
const localStorageMock = faStorage.localStorage;
```

## Support

Tested in these browsers:

- IE >= 10
- Chrome latest 2 versions
- Firefox latest 2 versions
- Edge 14+
- Safari 10+
