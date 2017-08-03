var storagePrototype = {
    clear: function clear() {
        Object.keys(this).forEach(this.removeItem.bind(this));
        this.length = 0;
    },
    key: function key(index) {
        var properties = Object.keys(this);
        return properties[index];
    },
    setItem: function setItem(key, value) {
        this[key] = value;
        this.length += 1;
    },
    getItem: function getItem(key) {
      return typeof this[key] === 'undefined' ? null : this[key];
    },
    removeItem: function removeItem(key) {
        delete this[key];
        this.length -= 1;
    }
};


module.exports = function memoryFactory() {
  return Object.create(storagePrototype, {
    length: {
      writable: true,
      value: 0,
      enumerable: false
    }
  });
};
