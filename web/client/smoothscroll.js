Meteor.startup(function(){
    // Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

 /*
    Plugin: ShowMore
    author: dtasic@gmail.com
    */
    
    $.fn.showMore = function (options) {
        
      "use strict";
      
      var currentelem = 1;
      
      this.each(function(){
          
          var currentid = '';
          var element = $(this);
          var auto = parseInt(element.innerHeight())/2;
          var fullheight = element.innerHeight();
          var settings = $.extend({
              minheight: auto,
              buttontxtmore: "show more",
              buttontxtless: "show less",
              buttoncss: "showmore-button",
              animationspeed: auto       
          }, options );        
          
          element.attr('id') != undefined ? currentid = element.attr('id') : currentid = currentelem;
          element.wrap( "<div id='showmore-"+currentid+"' data-showmore style='max-width:"+element.css('width')+";'></div>" );
          
          if (element.parent().not('[data-showmore]')) {
          
              if (fullheight > settings.minheight) {
                  
                  element.css('min-height', settings.minheight).css('max-height', settings.minheight).css('overflow', 'hidden');
                  var showMoreButton = $("<div />", {
                      id: "showmore-button-"+currentid,
                      "class": settings.buttoncss,
                      click: function() {

                          if (element.css('max-height') != 'none') {
                              element.css('height', settings.minheight).css('max-height', '').animate({height:fullheight}, settings.animationspeed, function () { showMoreButton.html(settings.buttontxtless); });
                          } else {
                              element.animate({height:settings.minheight}, settings.animationspeed, function () { showMoreButton.html(settings.buttontxtmore); element.css('max-height', settings.minheight); });
                          }
                      },
                      html: settings.buttontxtmore
                  });

                  element.after(showMoreButton);

              }
              
              currentelem++;
              
          }
          
      });
      
      return this;
      
  };
});