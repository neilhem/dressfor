"use strict";$(function(){$(".js-raty").raty({starOff:"images/star-off.png",starOn:"images/star-on.png"}),$(".js-scrollbar").mCustomScrollbar({axis:"y",theme:"custom"});new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:!0,autoplay:5e3,spaceBetween:30,effect:"fade"});$(document).on("click",".js-cat .dropdown-menu > li > a",function(a){a.preventDefault(),console.log(a),$(".js-cat .dropdown-menu > li").removeClass("active"),$(this).parent().addClass("active"),$(".js-cat-text").text($(this).text()),$(".js-cat-link").attr("href",$(this).attr("href"))})}),function(a,b){a("#showImage").length&&a.getJSON("patterns.json",function(c){function d(){var a=new b.Image(document.getElementById("pattern"),{top:0,left:0}),c=new b.StaticCanvas;c.add(a);var d=new b.Pattern({source:function(){return c.setDimensions({width:a.getWidth(),height:a.getHeight()}),c.getElement()},repeat:"repeat"});o.add(new b.Polygon([{x:0,y:0},{x:o.width,y:0},{x:o.width,y:o.height},{x:0,y:o.height}],{left:0,top:0,fill:d}))}function e(a,c){var d=a,e=new b.Image(d,p);e.scaleToWidth(70),e.id=c,n.add(e)}function f(a,c,e,f,g){b.Image.fromURL("images/"+l+"/patterns/"+j.categories[k].patterns[a].colors[0].image+".png",function(b){b.scaleToWidth(f||70),b.id=a,b.index=g||0,n.add(b),d()},{top:e,left:c,borderColor:"#d2d2d2",cornerColor:"#d2d2d2",cornerSize:5,lockUniScaling:!0})}function g(a,b){return Math.floor(Math.random()*(b-a))+a}function h(a){return g(0,a.length)}function i(b){a(".pattern-color").removeClass("hidden").find("> .list-unstyled").empty(),a.each(j.categories[k].patterns[b].colors,function(b,c){a(".pattern-color > .list-unstyled").append('<li><span data-index="'+b+'" style="background-color:'+c.name+';" title="'+c.name+'"></span></li>')})}var j=c,k=a(".pattern").data("index"),l=j.categories[k].name,m=j.categories[k].patterns,n=new b.Canvas("pattern"),o=new b.StaticCanvas("showImage");n.backgroundColor="rgba(0,0,0,0)";var p={top:100,left:100,borderColor:"#d2d2d2",cornerColor:"#d2d2d2",cornerSize:5,lockUniScaling:!0};n.on("mouse:up",function(a){d()}),n.on("object:moving",function(a){console.log(a,a.target.top,a.target.left);var b=a.target;(b.top<0||b.left<0)&&console.log("outside of boundary")}),n.on("object:selected",function(a){console.log(a.target.id),i(a.target.id)}),n.on("selection:cleared",function(b){a(".pattern-color").addClass("hidden")}),a(function(){a.each(m,function(b,c){var d=c.colors.length>1?h(c.colors):0;a(".pattern-list .list-unstyled").append('<li><img src="images/'+l+"/patterns/"+c.colors[d].image+'.png" title="Add pattern" alt=""></li>')});var c=j.categories[k].defaults;a.each(c,function(a,b){f(b.index,b.x,b.y,b.w,a)}),a(".pattern-list ul > li > img").on("click",function(){e(this,a(this).parent().index()),d(n.toDataURL())}),a(".pattern-color > .btn").on("click",function(){n.getActiveObject().remove(),d(),a(this).parent().addClass("hidden").find("> ul").empty()}),a(document).on("click",".pattern-color > ul > li > span",function(){console.log("click",n.getActiveObject().id);var c=n.getActiveObject().id,e=a(this).data("index"),f=n.getActiveObject().left,g=n.getActiveObject().top,h=n.getActiveObject().index||0,i=n.getActiveObject().scaleX,m=n.getActiveObject().scaleY;n.getActiveObject().remove(),b.Image.fromURL("images/"+l+"/patterns/"+j.categories[k].patterns[c].colors[e].image+".png",function(a){a.scaleToWidth(70),a.id=c,n.add(a),d()},{top:g,left:f,scaleX:i,scaleY:m,index:h,borderColor:"#d2d2d2",cornerColor:"#d2d2d2",cornerSize:5,lockUniScaling:!0}),d(n.toDataURL())})})})}(jQuery,fabric);