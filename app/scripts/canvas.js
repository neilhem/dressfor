/* global fabric, patternConfig */

(function($, config) {
  'use strict';

  if (!$('#showImage').length) {
    return;
  }

  var canvasPattern = new fabric.Canvas('pattern');
  var canvasImage = new fabric.StaticCanvas('showImage');
  var defaultPattern = true;
  canvasPattern.backgroundColor = 'rgba(0,0,0,0)';

  var imageConfig = {
    top: 100,
    left: 100,
    borderColor: '#bfbfbf',
    cornerColor: '#bfbfbf',
    cornerSize: 6,
    lockUniScaling: true
  };

  console.log(fabric);

  function renderImage() {
    var img = new fabric.Image(document.getElementById('pattern'), {
      top: 0,
      left: 0
    });

    var patternSourceCanvas = new fabric.StaticCanvas();
    patternSourceCanvas.add(img);

    var pattern = new fabric.Pattern({
      source: function() {
        patternSourceCanvas.setDimensions({
          width: img.getWidth(),
          height: img.getHeight()
        });
        return patternSourceCanvas.getElement();
      },
      repeat: 'repeat'
    });

    canvasImage.add(new fabric.Polygon([
      {x: 0, y: 0},
      {x: canvasImage.width, y: 0},
      {x: canvasImage.width, y: canvasImage.height},
      {x: 0, y: canvasImage.height}
    ], {
      left: 0,
      top: 0,
      fill: pattern
    }));
  }

  fabric.Image.fromURL('images/forest/pattern.png', function(img) {
    img.scaleToWidth(265);
    canvasPattern.add(img).setActiveObject(img);

    canvasPattern.renderAll();
    renderImage();
  });

  canvasPattern.on('mouse:up', function(options) {
    console.log(options.e.clientX, options.e.clientY);
    renderImage();
  });

  function addPattern(image) {

    // remove default pattern on first call
    if (defaultPattern) {
      defaultPattern = false;
      canvasPattern.remove(canvasPattern.getActiveObject());
    }

    var imgElement = image;
    var imgInstance = new fabric.Image(imgElement, imageConfig);
    imgInstance.scaleToWidth(70);
    canvasPattern.add(imgInstance);
  }

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
      renderImage(canvasPattern.toDataURL());
    });
  });

})(jQuery, patternConfig);

