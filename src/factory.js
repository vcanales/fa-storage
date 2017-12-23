function factory(context) {
  var myLocalStorage = context.localStorage;
  var mySessionStorage = context.sessionStorage;
  var cookieEnabled = typeof context.document !== 'undefined';

  try {
    myLocalStorage.setItem('foobarquax', 'foobarquax');
    myLocalStorage.removeItem('foobarquax');
  } catch (err) {
    if (cookieEnabled) {
      var cookieStorage = require('./cookie');
      myLocalStorage = cookieStorage(100, 'local');
      mySessionStorage = cookieStorage(0, 'session');
    } else {
      var memoryStorage = require('./memory');
      myLocalStorage = memoryStorage();
      mySessionStorage = memoryStorage();
    }
  }

  return {
    localStorage: myLocalStorage,
    sessionStorage: mySessionStorage
  };
}

module.exports = factory;
