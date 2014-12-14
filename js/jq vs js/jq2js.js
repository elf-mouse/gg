// jQueryObject to DOMObject
var jqObj = $('#selector');

var domObj = jqObj.get(0);
var domObj2 = jqObj[0];

domObj.style.color = 'red';
alert(domObj2.innerHTML);
