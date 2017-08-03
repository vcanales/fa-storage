function getCookie(key){
  var results = new RegExp(key + '=(.*?)(;|$)','g').exec(document.cookie);
  return results ? results[1] : null;
}

function addDays(days) {
  var date = new Date();
  var additionalDays = 1000 * 60 * 60 * 24 * days;
  date.setTime(date.getTime() + additionalDays);
  return date;
}

function serializeObject(obj, days) {
  var serializedData = window.btoa(JSON.stringify(obj));
  document.cookie = this.seed + '=' + serializedData + ';path=/;expires=' + addDays(days).toUTCString();
}

function assign(target, source) {
  Object.keys(source).forEach(function(key) {
    target[key] = source[key];
  });

  return target;
}

function rebuildObject(serializedStr) {
  return JSON.parse(window.atob(serializedStr));
}

var storagePrototype = {
  clear: function clear() {
    var seed = this.seed;
    Object.keys(this).forEach(this.removeItem.bind(this));
    this.length = 0;

    setTimeout(function() {
      document.cookie = seed + '=null;path=/;expires=' + addDays(-7).toUTCString();
    }, 0);
  },
  key: function key(index) {
    var properties = Object.keys(this);
    return properties[index];
  },
  setItem: function setItem(key, value) {
    this[key] = value;
    this.length += 1;

    setTimeout(serializeObject.bind(this, this, this.days), 0);
  },
  getItem: function getItem(key) {
    return typeof this[key] === 'undefined' ? null : this[key];
  },
  removeItem: function removeItem(key) {
    delete this[key];
    this.length -= 1;

    setTimeout(serializeObject.bind(this, this, this.days), 0);
  }
};

module.exports = function cookieFactory(days, sessionType) {
  var storageObject = Object.create(storagePrototype);
  var seedName = sessionType + '-seed';
  var obj = getCookie(seedName);

  Object.defineProperties(storageObject, {
    length: {
      value: 0,
      writable: true,
      enumerable: false
    },
    seed: {
      value: seedName,
      writable: false,
      enumerable: false,
      configurable: false
    },
    days: {
      value: days,
      writable: false,
      enumerable: false
    }
  });

  if (obj) {
    assign(storageObject, rebuildObject(obj));
  }

  return storageObject;
};
