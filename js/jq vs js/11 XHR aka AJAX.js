// jQuery
$.get('url', function(data) {

});
$.post('url', {
  data: data
}, function(data) {

});

// Native

// get
var xhr = new XMLHttpRequest();

xhr.open('GET', url);
xhr.onreadystatechange = function(data) {

}
xhr.send();

// post
var xhr = new XMLHttpRequest()

xhr.open('POST', url);
xhr.onreadystatechange = function(data) {

}
xhr.send({
  data: data
});
