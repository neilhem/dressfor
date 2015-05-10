/* global fabric, patternConfig */

(function($, config) {
  'use strict';

  if (!$('#pattern').legnth) {
    return;
  }

  var canvasPattern = new fabric.Canvas('pattern');
  var canvasImage = new fabric.StaticCanvas('showImage');
  var defaultPattern = true;
  canvasPattern.backgroundColor = '#fff';

  fabric.Image.fromURL('images/forest/pattern.png', function(img) {
    img.scaleToWidth(265);
    canvasPattern.add(img).setActiveObject(img);

    canvasPattern.item(0).hasRotatingPoint = false;
    canvasPattern.renderAll();
  });

  fabric.Image.fromURL($('#showImage').data('image'), function(img) {
    canvasImage.add(img);
    canvasImage.renderAll();
  });

  function addPattern(image) {
    console.log(image);
    if (defaultPattern) {
      defaultPattern = false;
      console.log(canvasPattern);
    } else {
      var imgElement = $(image)[0];
      var imgInstance = new fabric.Image(imgElement, {
        top: 100,
        left: 100
      });
      imgInstance.scaleToWidth(100);
      canvasPattern.add(imgInstance);
    }
  }

  $(function() {
    var catIndex = $('.pattern-list').data('index');
    var catName = config.categories[catIndex].name;
    var catPatterns = config.categories[catIndex].patterns;
    $.each(catPatterns, function(i, pattern) {
      $('.pattern-list').append(
        '<li><img src="images/' + catName + '/patterns/' + pattern.colors[0].image + '.png" alt="">'
      );
    });

    $('.pattern-list > li > img').on('click', function() {
      addPattern(this);
    });
  });

})(jQuery, patternConfig);

