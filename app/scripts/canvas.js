/* global fabric */

(function($, fabric) {
  'use strict';

  if (!$('#showImage').length) {
    return;
  }

  $.getJSON('patterns.json', function(data) {
    var config = data;

    var catIndex = $('.pattern').data('index');

    var catName = config.categories[catIndex].name;
    var catPatterns = config.categories[catIndex].patterns;

    var canvasPattern = new fabric.Canvas('pattern');
    var canvasImage = new fabric.StaticCanvas('showImage');
    var defaultPattern = true;
    canvasPattern.backgroundColor = 'rgba(0,0,0,0)';

    var imageConfig = {
      top: 100,
      left: 100,
      borderColor: '#d2d2d2',
      cornerColor: '#d2d2d2',
      cornerSize: 5,
      lockUniScaling: true
    };

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

    fabric.Image.fromURL('images/' + catName + '/pattern.png', function(img) {
      img.scaleToWidth(265);
      canvasPattern.add(img);

      canvasPattern.renderAll();
      renderImage();
    });

    canvasPattern.on('mouse:up', function(options) {
      renderImage();
    });

    canvasPattern.on('mouse:out', function(options) {
      console.log('mouse out');
      canvasPattern.deactivateAll().renderAll();
      renderImage();
    });

    canvasPattern.on('object:moving', function(options) {
      console.log(options);
      var object = options.target;

      if (object.top < 0 || object.left < 0) {
        console.log('outside of boundary');
      }
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
      console.log(canvasPattern.item());
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomColor(colors) {
      return getRandomInt(0, colors.length);
    }

    $(function() {
      // create patterns elements
      $.each(catPatterns, function(i, pattern) {

        var randomColorIndex = pattern.colors.length > 1 ? randomColor(pattern.colors) : 0;

        $('.pattern-list .list-unstyled').append(
          '<li><img src="images/' + catName + '/patterns/' + pattern.colors[randomColorIndex].image +
            '.png" title="Add pattern" alt=""></li>'
        );
      });

      // add selected pattern to pattern canvas
      $('.pattern-list ul > li > img').on('click', function() {
        console.log(this);
        addPattern(this);
        renderImage(canvasPattern.toDataURL());
      });
    });
  });
})(jQuery, fabric);
