// jshint devel:true
'use strict';

$(function() {
  $('.js-raty').raty({
    starOff: '/images/star-off.png',
    starOn: '/images/star-on.png'
  });
});

if ($('#show').length) {
  // Show canvas
  var show = {};
  show.canvas = document.getElementById('show');
  show.context = show.canvas.getContext('2d');
  show.context.fillStyle = '#fbfbfb';
  show.context.fillRect(0, 0, show.canvas.width, show.canvas.height);

  var overlayImage = new Image();
  overlayImage.src = 'https://www.google.kz/images/srpr/logo11w.png';
  overlayImage.onload = function(e) {
    console.log('overlayImage is loaded', e);
  }

  // Pattern canvas
  var canvasPattern = document.getElementById('pattern');
  var canvasPatternContext = canvasPattern.getContext('2d');
  canvasPatternContext.fillStyle = '#fbfbfb';
  canvasPatternContext.fillRect(0, 0, canvasPattern.width, canvasPattern.height);

  function addPatternImage(context) {
    var thatImage = new Image();
    thatImage.src = '/images/forest/pattern.png';
    thatImage.onload = function() {
      context.save();
      context.drawImage(thatImage, 0, 0, 251, 243);
    };
  }

  function copyPattern(context) {
    console.log(context);
    var canvasLayer = document.createElement('canvas');
    canvasLayer.width = 100;
    canvasLayer.height = 100;
    var layerContext = canvasLayer.getContext('2d');
    layerContext.drawImage(overlayImage, 0, 0, 100, 35);
    context.globalCompositeOperation = 'overlay';
    context.drawImage(canvasLayer, 100, 200);
  }

  addPatternImage(canvasPatternContext);
  show.image = new Image();
  show.image.src = '/images/raw-00.jpg';
  show.image.onload = function() {
    show.context.save();
    show.context.drawImage(show.image, 0, 0, show.canvas.width, show.canvas.height);
    copyPattern(show.context);
  };
}
