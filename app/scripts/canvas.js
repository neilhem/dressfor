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

    canvasPattern.on('mouse:up', function(options) {
      renderImage();
    });

    canvasPattern.on('mouse:out', function(options) {
      console.log('mouse out');
      // canvasPattern.deactivateAll().renderAll();
      // renderImage();
    });

    canvasPattern.on('object:moving', function(options) {
      console.log(options);
      var object = options.target;

      if (object.top < 0 || object.left < 0) {
        console.log('outside of boundary');
      }
    });

    canvasPattern.on('object:selected', function(e) {
      renderColors(e.target.index);
    });

    canvasPattern.on('selection:cleared', function(e) {
      $('.pattern-color').addClass('hidden');
    });

    function addPattern(image, index) {

      var imgElement = image;
      var imgInstance = new fabric.Image(imgElement, imageConfig);
      imgInstance.scaleToWidth(70);
      imgInstance.index = index;
      canvasPattern.add(imgInstance);
    }

    function addDefaultPattern(index, x, y, w) {
      fabric.Image.fromURL('images/' + catName + '/patterns/' +
        config.categories[catIndex].patterns[index].colors[0].image + '.png', function(img) {
        img.scaleToWidth(w || 70);
        img.index = index;
        canvasPattern.add(img);
        renderImage();
      }, {
        top: y,
        left: x,
        borderColor: '#d2d2d2',
        cornerColor: '#d2d2d2',
        cornerSize: 5,
        lockUniScaling: true
      });
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomColor(colors) {
      return getRandomInt(0, colors.length);
    }

    function renderColors(index) {
      $('.pattern-color').removeClass('hidden').find('> .list-unstyled').empty();
      $.each(config.categories[catIndex].patterns[index].colors, function(i, color) {
        $('.pattern-color > .list-unstyled').append(
          '<li><span data-index="' + i + '" style="background-color:' + color.name + ';" title="' + color.name + '"></span></li>'
        );
      });
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

      var defaults = config.categories[catIndex].defaults;

      $.each(defaults, function(i, pattern) {
        addDefaultPattern(pattern.index, pattern.x, pattern.y, pattern.w);
      });

      // add selected pattern to pattern canvas
      $('.pattern-list ul > li > img').on('click', function() {
        addPattern(this, $(this).parent().index());
        renderImage(canvasPattern.toDataURL());
      });

      $('.pattern-color > .btn').on('click', function() {
        canvasPattern.getActiveObject().remove();
        renderImage();
        $(this).parent().addClass('hidden').find('> ul').empty();
      });

      $(document).on('click', '.pattern-color > ul > li > span', function() {
        console.log('click', canvasPattern.getActiveObject());
        var patternIndex = canvasPattern.getActiveObject().index;
        var colorIndex = $(this).data('index');
        var left = canvasPattern.getActiveObject().left;
        var top = canvasPattern.getActiveObject().top;
        canvasPattern.getActiveObject().remove();

        fabric.Image.fromURL('images/' + catName + '/patterns/' +
          config.categories[catIndex].patterns[patternIndex].colors[colorIndex].image + '.png', function(img) {
          img.scaleToWidth(70);
          img.index = patternIndex;
          canvasPattern.add(img);
          renderImage();
        }, {
          top: left,
          left: top,
          borderColor: '#d2d2d2',
          cornerColor: '#d2d2d2',
          cornerSize: 5,
          lockUniScaling: true
        });
        renderImage(canvasPattern.toDataURL());
      });
    });
  });
})(jQuery, fabric);
