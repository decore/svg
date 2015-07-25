(function(document){
  "use strict";
  $(document).ready(function(){
    if ($.browser.msie || $(body).hasClass('no-svg')) {
      $('head').append('<link href="/dist/backgrounds/css/sprite.css" rel="stylesheet">');
    }
  });

  function renderData() {
    var SVG;
    var svgUrl = '/dist/symbols/svg/symbols.svg'
    $('#data').load(svgUrl, function(result) {
        SVG = $('#data').html();
      document.querySelector("body").insertAdjacentHTML("afterbegin", SVG);
      $('#data').remove();
    });
    var STYLE = '<style>@-webkit-keyframes spin { 100% { -webkit-transform: r'+
'otate(360deg); transform: rotate(360deg); } } @keyframes spi'+
'n { 100% { -webkit-transform: rotate(360deg); transform: rot'+
'ate(360deg); } } .icon { /* position: relative;*/ display: i'+
'nline-block; /* width: 100px; height: 100px;*/ /* overflow: '+
'hidden;*/ } .icon__cnt { width: 100%; height: 100%; /*backgr'+
'ound: inherit;*/ /*fill: currentColor;*/ /*transform: transl'+
'ateX(0); Crisp fix for non-retina*/ /*-ms-transform: transla'+
'te(.5px,-.3px); Crisp fix for IE */ } .icon__spinner { posit'+
'ion: absolute; top: 0; left: 0; width: 100%; height: 100%; }'+
'</style>';

    document.querySelector("head").insertAdjacentHTML("afterbegin", STYLE);
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


    if ($.browser.msie || $(body).hasClass('no-svg')) {
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