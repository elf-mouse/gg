// D同事的range.js--限定拖拽范围

define(function(require, exports, module) {

  function range(iNum, iMax, iMin) {

    if (iNum > iMax) {
      return iMax;
    } else if (iNum < iMin) {
      return iMin;
    } else {
      return iNum;
    }

  }

  exports.range = range;

});
