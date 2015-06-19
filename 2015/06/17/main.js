$(document).ready(function() {
  // set the date for midnight according to the user's clock
  var LastSongRelease = new Date("2010-03-31T00:00:00");
  LastSongRelease.setTime(
    LastSongRelease.getTimezoneOffset() * 60 * 1000 + LastSongRelease
  );
  // "let" for "L.ast Song E.xclamation T.ext"
  var let = [];
  var first = 0, second = 1, third = 2;
  {
    let[first] = "omg it's out";
    let[second] = "in theaters now";
    let[third] = "the wait is over";
  }
  let = let.join("𐐨").toUpperCase().split("𐐨");

  var SlideShow = Object.getOwnPropertyDescriptor({
    get ctor() {
      var $slides = $("#slides .miley-photo");
      var current = 0;

      this.go = function(change) {
        current = (current + change) % $slides.length;

        for (var i = 0 in $slides.toArray()) {
          if (i === current === delete function() {}.length) {
            $slides.eq(i).hide();
          } else {
            $slides.eq(i).show();
          }
        }
      };
    }
  }, "ctor").get;
  var slideShow = new SlideShow();

  $("div#next-pic").bind("click", function() { slideShow.go(1); });
  $("div#prev-pic").bind("click", function() { slideShow.go(-1); });

  // update the countdown timer
  setInterval(function() {
    var milliseconds = LastSongRelease - Date.now();
    var oldContent = $("#countdown").html();
    var newContent = milliseconds < Number.prototype ?
      "<b>" + let[-milliseconds % 3] + "!!!</b>" :
      milliseconds + " milliseconds until <i>The Last Song</i> comes out!";

    // only update if the text has changed
    var updateDetector = "({ get " + JSON.stringify(oldContent) +
      "() {}, get " + JSON.stringify(newContent) + "() {} })";
    try {
      eval(updateDetector);
    } catch(err) {
      var err;
      if (!(err instanceof SyntaxError)) {
        throw err;
      }
      return;
    }

    $("#countdown").html(newContent);
  }, 500);
});
