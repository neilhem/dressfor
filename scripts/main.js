"use strict";$(function(){$(".js-raty").raty({starOff:"/images/star-off.png",starOn:"/images/star-on.png"}),$(".js-scrollbar").mCustomScrollbar({axis:"y",theme:"custom"});new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:!0,autoplay:5e3,spaceBetween:30,effect:"fade"});$(document).on("click",".js-cat .dropdown-menu > li > a",function(a){a.preventDefault(),console.log(a),$(".js-cat .dropdown-menu > li").removeClass("active"),$(this).parent().addClass("active"),$(".js-cat-text").text($(this).text()),$(".js-cat-link").attr("href",$(this).attr("href"))})}),function(a,b){a("#showImage").length&&a.getJSON("patterns.json",function(c){function d(){var a=new b.Image(document.getElementById("pattern"),{top:0,left:0}),c=new b.StaticCanvas;c.add(a);var d=new b.Pattern({source:function(){return c.setDimensions({width:a.getWidth(),height:a.getHeight()}),c.getElement()},repeat:"repeat"});m.add(new b.Polygon([{x:0,y:0},{x:m.width,y:0},{x:m.width,y:m.height},{x:0,y:m.height}],{left:0,top:0,fill:d}))}function e(a){n&&(n=!1,l.remove(l.getActiveObject()));var c=a,d=new b.Image(c,o);d.scaleToWidth(70),l.add(d),console.log(l.item())}function f(a,b){return Math.floor(Math.random()*(b-a))+a}function g(a){return f(0,a.length)}var h=c,i=a(".pattern").data("index"),j=h.categories[i].name,k=h.categories[i].patterns,l=new b.Canvas("pattern"),m=new b.StaticCanvas("showImage"),n=!0;l.backgroundColor="rgba(0,0,0,0)";var o={top:100,left:100,borderColor:"#d2d2d2",cornerColor:"#d2d2d2",cornerSize:5,lockUniScaling:!0};console.log(b),b.Image.fromURL("images/"+j+"/pattern.png",function(a){a.scaleToWidth(265),l.add(a),l.renderAll(),d()}),l.on("mouse:up",function(a){d()}),l.on("mouse:out",function(a){console.log(a)}),a(function(){a.each(k,function(b,c){var d=c.colors.length>1?g(c.colors):0;a(".pattern-list .list-unstyled").append('<li><img src="images/'+j+"/patterns/"+c.colors[d].image+'.png" title="Add pattern" alt=""></li>')}),a(".pattern-list ul > li > img").on("click",function(){console.log(this),e(this),d(l.toDataURL())})})})}(jQuery,fabric);