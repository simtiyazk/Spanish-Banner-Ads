'use strict'; // Following is a SuperClass for your app

var LTApp = function LTApp() {
  this.INITED = false;
}; // Images preloading functions


LTApp.prototype = {
  preload: function preload(sources, callback) {
    this.sources = sources;
    var imgcount = 0;
    var img;
    $('*').each(function (i, el) {
      if (el.tagName !== 'SCRIPT' && el.tagName !== 'feMergeNode') {
        this.findImageInElement(el);
      }
    }.bind(this));

    if (this.sources.length === 0) {
      callback.call();
    } else if (document.images) {
      for (var i = 0; i < this.sources.length; i++) {
        img = new Image();

        img.onload = function () {
          imgcount++;

          if (imgcount === this.sources.length) {
            callback.call();
          }
        }.bind(this);

        img.src = this.sources[i];
      }
    } else {
      callback.call();
    }
  },
  determineUrl: function determineUrl(element) {
    var url = '';
    var t;
    var style = element.currentStyle || window.getComputedStyle(element, null);

    if (style.backgroundImage !== '' && style.backgroundImage !== 'none' || element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none') {
      t = style.backgroundImage || element.style.backgroundImage;

      if (t.indexOf('gradient(') === -1) {
        url = t.split(',');
      }
    } else if (typeof element.getAttribute('src') !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
      url = element.getAttribute('src');
    }

    return [].concat(url);
  },
  findImageInElement: function findImageInElement(element) {
    var urls = this.determineUrl(element);
    var extra = navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Opera/i) ? '?rand=' + Math.random() : '';
    urls.forEach(function (url) {
      url = this.stripUrl(url);

      if (url !== '') {
        this.sources.push(url + extra);
      }
    }.bind(this));
  },
  stripUrl: function stripUrl(url) {
    url = $.trim(url);
    url = url.replace(/url\(\"/g, '');
    url = url.replace(/url\(/g, '');
    url = url.replace(/\"\)/g, '');
    url = url.replace(/\)/g, '');
    return url;
  }
};
/**
 *
 * Main Application
 *
 **/

function App_banner() {
  if (App_banner.instance !== undefined) {
    return App_banner.instance;
  } else {
    App_banner.instance = this;
  }

  LTApp.call(this);
  return App_banner.instance;
}

App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;
/**
 *
 * Singleton thing
 *
 **/

App_banner.getInstance = function () {
  if (App_banner.instance === undefined) {
    new App_banner();
  }

  return App_banner.instance;
};
/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/


App_banner.fn.init = function () {
  if (!this.INITED) {
    this.INITED = true;
    /**
    * Add the images url you want to preload in the empty array on the first parameter
    */

    this.preload([], this.display.bind(this));
  }

  IDsToVars();
};
/**
 *
 * shows everything, start animating
 *
 **/


App_banner.fn.display = function () {
  $('body').removeClass('loading');
  $('body').addClass('loaded');
  App_banner.fn.anima();
};
"use strict";

/**
 *
 * start animating
 *
 **/
App_banner.fn.anima = function () {
  // isi clone, NOTE: if you want to see a copy of the ISI next to the banner uncomment the follow line
  // $('#isi').clone().addClass('uat').attr('id', 'isi-clone').appendTo('body');
  // Variables
  var tl = new TimelineMax();
  var placeholder = $('.animation-placeholder');
  var cta = $('#cta');
  var isiMain = $('#isi-main');
  var mainExit = $('#main-panel');
  var myScroll;
  var scrollBar;
  var scrollSpeed;
  var scrolledPercentage;
  var scrollWrapHeight;
  var isiHeight;
  var scrollSetUp;
  var intialScrollSpeed = 90000;
  var animationFinished = false; // Assign timeline to window to be able to test.

  window.tl = tl; //
  // Timeline Animation
  //
  // Exits Listeners
  //mainExit.on('click', App_banner.fn.mainExitHandler);

  cta.on('click', App_banner.fn.ctaExitHandler);
}; // Main Exit Handler


App_banner.fn.ctaExitHandler = function (e) {
  e.preventDefault();
  Enabler.exit('clickTag1', clickTag1);
}; // CTA Exit Handler
// App_banner.fn.ctaExitHandler = function(e) {
//     e.preventDefault();
//     Enabler.exit('clickTag2', clickTag2);
// };
// SET IDS IN DOM TO GLOBAL VARIABLES


function IDsToVars() {
  var allElements = document.getElementsByTagName('id');

  for (var q = 0; q < allElements.length; q++) {
    var el = allElements[q];

    if (el.id) {
      window[el.id] = document.getElementById(el.id);
    }
  }
}

;