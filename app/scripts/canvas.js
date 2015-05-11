/* global fabric, patternConfig */

(function($, config) {
  'use strict';

  if (!$('#showImage').length) {
    return;
  }

  var canvasPattern = new fabric.Canvas('pattern');
  var canvasImage = new fabric.StaticCanvas('showImage');
  var defaultPattern = true;
  canvasPattern.backgroundColor = '#fff';

  fabric.Image.fromURL('images/forest/pattern.png', function(img) {
    img.scaleToWidth(265);
    canvasPattern.add(img).setActiveObject(img);

    canvasPattern.renderAll();
  });

  fabric.Image.fromURL($('#showImage').data('image'), function(img) {
    console.log(img.width, img.height, canvasImage);
    canvasImage.width = img.width;
    canvasImage.height = img.height;
    canvasImage.add(img);
    canvasImage.renderAll();
  });

  function addPattern(image) {
    console.log(image);
    if (defaultPattern) {
      defaultPattern = false;
      console.log(canvasPattern);
    }

    var imgElement = image;
    var imgInstance = new fabric.Image(imgElement, {
      top: 100,
      left: 100,
      borderColor: '#bfbfbf',
      cornerColor: '#bfbfbf',
      cornerSize: 6,
      lockScalingFlip: true
    });
    imgInstance.scaleToWidth(70);
    canvasPattern.add(imgInstance);
  }

  // canvasPattern.setOverlayImage(canvasImage, canvasPattern.renderAll.bind(canvasPattern));

  $(function() {

    // create patterns elements
    var catIndex = $('.pattern-list').data('index');
    var catName = config.categories[catIndex].name;
    var catPatterns = config.categories[catIndex].patterns;
    $.each(catPatterns, function(i, pattern) {
      $('.pattern-list').append(
        '<li><img src="images/' + catName + '/patterns/' + pattern.colors[0].image + '.png" alt="">'
      );
    });

    // add selected pattern to pattern canvas
    $('.pattern-list > li > img').on('click', function() {
      addPattern(this);
    });
  });

})(jQuery, patternConfig);

