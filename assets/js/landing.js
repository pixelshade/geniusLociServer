/**
 * Created by pixelshade on 17/09/15.
 */

  // Closes the sidebar menu
$("#menu-close").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// page ready

$(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setUserGeoPosition);
    }

// Scrolls to the selected menu item on the page
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
})

function setUserGeoPosition(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var callback = new EJS({url: 'templates/ghosts.ejs'}).update('#ghost-list');
  $.getJSON("/ghost/getNear?latitude=" + lat + "&longitude=" + lon,
    callback);

}


