// jshint devel:true
'use strict';

var patternConfig = {
  'categories': [
    {
      'name': 'forest',
      'patterns': [
        {
          'colors': [
            {
              'name': 'black',
              'image': '01'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'red',
              'image': '02_1'
            },
            {
              'name': 'yellow',
              'image': '02_2'
            },
            {
              'name': 'green',
              'image': '02_3'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '03'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '04'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '05'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'yellow',
              'image': '06_2'
            },
            {
              'name': 'green',
              'image': '06_3'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '07'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'red',
              'image': '08_1'
            },
            {
              'name': 'yellow',
              'image': '08_2'
            },
            {
              'name': 'green',
              'image': '08_3'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '09'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'yellow',
              'image': '10_2'
            },
            {
              'name': 'green',
              'image': '10_3'
            },
            {
              'name': 'black',
              'image': '10_4'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '11'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '12_1'
            },
            {
              'name': 'yellow',
              'image': '12_2'
            },
            {
              'name': 'green',
              'image': '12_3'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'yellow',
              'image': '13_2'
            },
            {
              'name': 'green',
              'image': '13_3'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '14'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '15'
            }
          ]
        },
        {
          'colors': [
            {
              'name': 'black',
              'image': '16'
            }
          ]
        },
      ]
    }
  ]
};

var userSelectedCat = false;

$(function() {
  $('.js-raty').raty({
    starOff: '/images/star-off.png',
    starOn: '/images/star-on.png'
  });

  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: '.swiper-pagination',
    autoplay: 5000,
    spaceBetween: 30,
    effect: 'fade',
    onSlideChangeEnd: function(swiper) {
      if (!userSelectedCat) {
        // console.log(swiper);
      }
    }
  });

  $('.js-cat .dropdown-menu > li > a').on('click', function(e) {
    e.preventDefault();
    console.log(e);

    $('.js-cat .dropdown-menu > li').removeClass('active');

    $(this).parent().addClass('active');

    $('.js-cat-text').text($(this).text());
    $('.js-cat-link').attr('href', $(this).attr('href'));
  });
});

// if ($('#showImage').length) {
//   // Show canvas
//   var show = {};
//   show.canvas = document.getElementById('showImage');
//   show.context = show.canvas.getContext('2d');
//   show.context.fillStyle = '#fbfbfb';
//   show.context.fillRect(0, 0, show.canvas.width, show.canvas.height);
// }
