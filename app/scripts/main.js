// jshint devel:true
'use strict';

$(function() {

  $('.js-raty').raty({
    starOff: '/images/star-off.png',
    starOn: '/images/star-on.png'
  });

  $('.js-scrollbar').mCustomScrollbar({
    axis: 'y',
    theme: 'custom'
  });

  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: '.swiper-pagination',
    autoplay: 5000,
    spaceBetween: 30,
    effect: 'fade'
  });

  $(document).on('click', '.js-cat .dropdown-menu > li > a', function(e) {
    e.preventDefault();
    console.log(e);

    $('.js-cat .dropdown-menu > li').removeClass('active');

    $(this).parent().addClass('active');

    $('.js-cat-text').text($(this).text());
    $('.js-cat-link').attr('href', $(this).attr('href'));
  });
});
