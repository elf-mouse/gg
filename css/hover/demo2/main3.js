/**
 * 判断鼠标进入图片的方向
 * http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
 */
function getDirection(element, event) {
  var w = element.offsetWidth,
    h = element.offsetHeight,
    x = (event.pageX - element.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1),
    y = (event.pageY - element.offsetTop - (h / 2)) * (h > w ? (w / h) : 1),
    direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

  return direction;
}

$(function() {
  var pic = $('#pic');
  pic.on('mouseenter', function(event) {
    var mask = $(this).find('.mask'),
      direction = getDirection(this, event);
    mask.css({
      top: 0,
      left: 0
    });
    switch (direction) {
      case 0:
        mask.css('top', '-256px');
        break;
      case 1:
        mask.css('left', '256px');
        break;
      case 2:
        mask.css('top', '256px');
        break;
      case 3:
        mask.css('left', '-256px');
        break;
    }

    mask.animate({
      left: 0,
      top: 0
    }, 250);

  }).on('mouseleave', function(event) {
    var mask = $(this).find('.mask'),
      direction = getDirection(this, event);
    switch (direction) {
      case 0:
        mask.animate({
          'top': '-256px'
        }, 250);
        break;
      case 1:
        mask.animate({
          'left': '256px'
        }, 250);
        break;
      case 2:
        mask.animate({
          'top': '256px'
        }, 250);
        break;
      case 3:
        mask.animate({
          'left': '-256px'
        }, 250);
        break;
    }
  });
});
