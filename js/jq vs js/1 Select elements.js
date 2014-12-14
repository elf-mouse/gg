// jQuery
var els = $('.el');

// Native
var els = document.querySelectorAll('.el');

// Shorthand
var $ = function(el) {
  return document.querySelectorAll(el);
}

var els = $('.el');

// Or use regex-based micro-selector lib
// http://jsperf.com/micro-selector-libraries
