//IN-memory storage
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
        this.length = this.length + 1;
    },
    getItem: function getItem(key) {
        if (typeof this[key] === 'undefined') return null;
    },
    removeItem: function removeItem(key) {
        delete this[key];
        this.length = this.length - 1;
    }
};

var myStorage = Object.create(storagePrototype, {
    length: {
        writable: true,
        value: 0,
        enumerable: false
    }
});


myStorage.setItem('nigga', true);


console.log(myStorage);
