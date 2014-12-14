// jQuery
$('.el').remove();

// Native
remove('.el');

function remove(el) {
  var toRemove = document.querySelector(el);
  toRemove.parentNode.removeChild(toRemove);
}
