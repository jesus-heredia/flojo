/**
 * Title: Flojo
 * Version: 1.0.0
 * Github repository: https://github.com/jesus-heredia/flojo
 *
 * What is Flojo?
 * Flojo is a very lightweight jQuery script for loading images lazily.
 *
 * Created by: Jesús Heredia Reboira
 * Contact: http://www.jesusheredia.info/contact
 * License: Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
 */

// When the document is ready.
$(document).ready(function() {

  // All the code should be executed in 'strict mode'.
  "use strict";

  // Window object.
  var $win = $(window),

  // Threshold (in pixels). The number of pixels as a minimum between our
  // current position and the following image(s) to be loaded lazily.
  // 200 is the value by default, but you can use the one you like the most.
  th = 200;

  function flojo() {

    // Array of candidate images to be swapped.
    var swappable_images = $('img:not([data-src="swapped"])'),

    // Height of the window.
    win_height = $win.height(),

    // Scrolling from the top of the page.
    win_scroll_top = $win.scrollTop();

    // Iterates through the candidate images.
    swappable_images.each(function() {

      // Height of the image that is being processing at the moment.
      var img_height = $(this).height(),

      // How far (in pixels) this image is from the top of the document.
      img_offset_top = $(this).offset().top;

      // Loads the candidate images into the HTML document if necessary.
      if (img_offset_top + img_height >= win_scroll_top - th &&
          img_offset_top <= win_height + win_scroll_top + th) {

        var new_image = new Image();

        new_image.src = $(this).attr('data-src');

        $(this).attr({

          src: new_image.src,

          'data-src': 'swapped'

        });

      }

    });

  } // End of the flojo() function.

  // Call Flojo right after the document is ready.
  flojo();

  // Call Flojo whenever a scroll event occurs.
  $win.scroll(flojo);

  // Call Flojo whenever a resize event occurs.
  $win.resize(flojo);

});
