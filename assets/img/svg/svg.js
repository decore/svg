// "use strict";
$(document).ready(function(){
  if ($.browser.msie || $('body').hasClass('no-svg')) {
    $('head').append('<link href="/assets/img/svg/sprite/css/sprite.css" rel="stylesheet">');
  };
});

(function(document){
  function renderData() {
    var SVG;
    var STYLE;
    var svgUrl = '/assets/img/svg/symbols/svg/symbols.svg';
    var cssUrl = '/assets/img/svg/svg.css';
    $.get(svgUrl, function(data) {
      SVG = new XMLSerializer().serializeToString(data.documentElement);
      document.querySelector("body").insertAdjacentHTML("afterbegin", SVG);
    });
    $('head').append('<style type="text/css" id="data-css"></style>');
    $('#data-css').load(cssUrl);

  };

  function mods(mod) {
    var mods = mod.split(',');
    var result = "";

    for (var i = 0; i < mods.length; i++) {
      result += " icon--"+ mods[i];
    };
    
    return result;
  };

  function icon(name, options) {
    var options = options || {};
    var mod    = options.mod ? mods(options.mod) : "";
    var klass   = "icon "+ name +" "+ mod +" "+ (options['class'] || "");


    if ($.browser.msie || $('body').hasClass('no-svg')) {
      var icon = "";
    } else {
      var icon =  "<svg class='icon__cnt'>"+
              "<use xlink:href='#"+ name +"' />"+
            "</svg>";
    }
    var html =  "<div class='" + klass + "'>"+
                  wrapSpinner(icon, klass) +
                "</div>";

    return html;
  };

  function wrapSpinner(html, klass) {
    if (klass.indexOf("spinner") > -1) {
      return "<div class='icon__spinner'>"+ html +"</div>";
    } else {
      return html;
    };
  };

  function renderIcons() {
    var render = true;
    var icons = document.querySelectorAll("[data-icon]");

    for (var i = 0; i < icons.length; i++) {
      var currentIcon = icons[i];
      var name        = currentIcon.getAttribute("data-icon");
      var options = {
        'class':  currentIcon.className,
        mod:   currentIcon.getAttribute("data-mod")
      };

      currentIcon.insertAdjacentHTML("beforebegin", icon(name, options));
      currentIcon.parentNode.removeChild(currentIcon);
    };
  };

  function ready() {
    renderData()
    renderIcons();
  };

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", ready, false);
  };
})(window.document);