// DOMObject to jQueryObject
var domObj = document.getElementById('demo');

var jqObj = $(domObj);

jqObj.click(function() {
  $(this).fadeOut();
});
