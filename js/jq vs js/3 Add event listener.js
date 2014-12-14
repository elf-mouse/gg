// jQuery
$('.el').on('event', function() {

});

// Native
[].forEach.call(document.querySelectorAll('.el'), function(el) {
  el.addEventListener('event', function() {

  }, false);
});
