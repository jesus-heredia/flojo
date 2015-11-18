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

$(document).ready(function() {

  // All the code should be executed in 'strict mode'.
  "use strict";

  // Window object.
  var $win = $(window),

  // Threshold (in pixels). The number of pixels as a minimum between our
  // current position and the following image(s) to be loaded lazily.
  // 200 is the value by default, but you can use the one you like the most.
  th = 200,

  // Is this the first time that flojo() is called by another piece of code?
  // True is the value by default.
  first_time = true,

  // Set of images to be swapped.
  images = [];

  function flojo() {

    if (first_time === false) {

      images = $('img:not([data-src="swapped"])');

    } else if (first_time === true) {

      images = $('img[data-src]');

      first_time = false;

    }

    // Is there at least one image to be swapped?
    if (images.length > 0) {

      // The height of the window.
      var  win_height = $win.height(),

      // Scrolling from the top of the page.
      win_scroll_top = $win.scrollTop();

      images.each(function() {

        // The height of this image.
        var img_height = $(this).height(),

        // How far (in pixels) this image is from the top of the document.
        img_offset_top = $(this).offset().top;

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

    }

  } // End of the flojo() function.

  flojo();

  $win.scroll(flojo);

  $win.resize(flojo);

});