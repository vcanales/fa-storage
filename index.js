(function moduleWrapper(factory, context) {
  if (typeof exports !== 'undefined') {
    module.exports = factory(context);
  } else {
    context.fakeStorage = factory(context);
  }
})(function innerFactory(context) {
  var cookieEnabled = typeof context.document !== 'undefined';
  var myLocalStorage = context.localStorage;
  var mySessionStorage = context.sessionStorage;

  try {
    myLocalStorage.setItem('foobarquax', 'foobarquax');
    myLocalStorage.removeItem('foobarquax');
  } catch (err) {
    if (cookieEnabled) {
      myLocalStorage = require('./src/cookie')(100, 'local');
      mySessionStorage = require('./src/cookie')(0, 'session');
    } else {
      myLocalStorage = require('./src/memory')();
      mySessionStorage = require('./src/memory')();
    }
  }

  return {
    localStorage: myLocalStorage,
    sessionStorage: mySessionStorage
  };
}, typeof window !== 'undefined' ? window : global);
