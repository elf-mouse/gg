// Array.prototype.contains()
// Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/contains#Polyfill
if (![].contains) {
  try {
    Object.defineProperty(Array.prototype, 'contains', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(searchElement /*, fromIndex*/ ) {
        if (this === undefined || this === null) {
          throw new TypeError('Cannot convert this value to object');
        }
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1]) || 0;
        if (n >= len) {
          return false;
        }
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) k = 0;
        }
        while (k < len) {
          var currentElement = O[k];
          if (searchElement === currentElement ||
            searchElement !== searchElement && currentElement !== currentElement
          ) {
            return true;
          }
          k++;
        }
        return false;
      }
    });
  } catch (e) {
    // IE 8 : catch "Object doesn't support this property or method" error
    Array.prototype.contains = function(searchElement /*, fromIndex*/ ) {
      if (this === undefined || this === null) {
        throw new TypeError('Cannot convert this value to object');
      }
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      if (n >= len) {
        return false;
      }
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) k = 0;
      }
      while (k < len) {
        var currentElement = O[k];
        if (searchElement === currentElement ||
          searchElement !== searchElement && currentElement !== currentElement
        ) {
          return true;
        }
        k++;
      }
      return false;
    }
  }
}
