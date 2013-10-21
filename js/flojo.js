/**
 * Flojo.js
 * A very lightweight jQuery script for loading images lazily.
 * https://github.com/jesus-heredia/flojo
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License
 * http://creativecommons.org/licenses/by-sa/3.0/
 * Created by: Jesús Heredia
 * https://github.com/jesus-heredia
 */

$(document).ready(function() {
  // Window object
  var $win = $(window),

  // Threshold (in pixels). The number of pixels as a minimum between our
	// current position and the following image(s) to be load lazily.
  // 200 is the value by default, but you can use the one you like the most.
  th = 200,

  // Is this the first time that flojo() is called by another piece of code?
  // True is the value by default.
  first_time = true;

  function flojo() {

    if (first_time == false) {

      var $images = $('img:not([data-src="swapped"])');

    } else if (first_time == true) {

      var $images = $('img[data-src]');

      first_time = false;

    }

    // The window's height
    var  win_height = $win.height(),

    // Scrolling from the top of the page
         win_scroll_top = $win.scrollTop();

    $images.each(function() {

      // The height of this image
      var img_height = $(this).height(),

      // The position of this image relative to the top of the document
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

  flojo();

  $win.scroll(flojo);

  $win.resize(flojo);

});
