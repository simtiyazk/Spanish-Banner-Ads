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
}; // SET IDS IN DOM TO GLOBAL VARIABLES


function IDsToVars() {
  var allElements = document.getElementsByTagName('id');

  for (var q = 0; q < allElements.length; q++) {
    var el = allElements[q];

    if (el.id) {
      window[el.id] = document.getElementById(el.id);
    }
  }
}
"use strict";

/* eslint-disable no-undef */

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
  var isi = $('.isi');
  var isiMain = $('#isiMain');
  var isiWrapper = $('#isi_wrapper');
  var initialScrollSpeed = 260000;
  var scrollToTop = true; // Set to false if you do not need to scroll to the top when the auto scroll finished

  var myScroll = null;
  var scrollBar = null;
  var scrollSpeed = 0;
  var scrolledPercentage = 0;
  var isiHeight = 0;
  var isiFinished = false;
  var animationFinished = false;
  var isAnimating = true;
  var scrollWrapHeight = isiWrapper.clientHeight; // Assign timeline to window to be able to test.

  window.tl = tl; // Scroll init function. Keep disable options as they

  function initScrollBars() {
    myScroll = new IScroll('#isi_wrapper', {
      scrollbars: 'custom',
      interactiveScrollbars: true,
      mouseWheel: true,
      momentum: true,
      click: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: false
    });
    window.myScroll = myScroll;
    scrollBar = $('.iScrollVerticalScrollbar');
  }

  function scrollSetUp(e) {
    myScroll.scrollBy(0, 0, 1, {
      fn: function fn(k) {
        return k;
      }
    });
  }

  function finishedAnimation() {
    animationFinished = true;
    startScroll();
  }

  function startScroll() {
    scrollWrapHeight = $('#isi_wrapper').outerHeight(), isiHeight = -1 * (isi.outerHeight() - scrollWrapHeight), scrolledPercentage = myScroll.y * 100 / isiHeight, scrollSpeed = initialScrollSpeed - initialScrollSpeed * (scrolledPercentage / 100);
    myScroll.refresh();
    setTimeout(function () {
      if (scrolledPercentage >= 100) {
        isiFinished = true;
      }

      myScroll.scrollTo(0, isiHeight, scrollSpeed, {
        fn: function fn(k) {
          return k;
        }
      });
    }, 300);
  }

  function stopScroll() {
    myScroll.isAnimating = false; // stop animation
  } // scroll init


  initScrollBars();
  isi.on('click', function () {
    if (animationFinished) {
      if (myScroll.isAnimating) {
        stopScroll();
      } else {
        startScroll();
      }
    }
  });
  myScroll.on('scrollStart', function () {
    if (animationFinished) {
      if (myScroll.isAnimating) {
        stopScroll();
      }
    }
  });
  myScroll.on('scrollEnd', function () {
    if (isAnimating) {
      isAnimating = false;
      animationFinished = true;
      setTimeout(function () {
        myScroll.scrollTo(0, 0);
      }, 10);
    }
  }); //
  // Timeline Animation
  //

  tl.addLabel('frame1', '+=0').to(actor, 0.5, {
    opacity: 0,
    ease: Power0.easeIn
  }, 'frame1+=1').addLabel('frame2', '+=0').to(f1bg, 2, {
    scale: 1.26,
    x: 83,
    y: 32,
    ease: Power0.easeIn
  }, 'frame2+=0').to(f2txt, 1, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame2+=1').addLabel('frame3', '+=1.5').to(f2txt, 0.5, {
    opacity: 0,
    ease: Power0.easeIn
  }, 'frame3+=1').to(f3gradient, 0.5, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame3+=1').to(f3txt, 0.5, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame3+=1').to(f4txt, 1, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame3+=2').to(ctaBlock, 1, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame3+=3').addLabel('frame4', '+=0').to([f1bg], 0, {
    opacity: 0,
    ease: Power0.easeIn
  }, 'frame4+=0').to([f3txt, f4txt, f3gradient], 0.5, {
    opacity: 0,
    ease: Power0.easeIn
  }, 'frame4+=4').to(f5gradient, 0.5, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame4+=4').to(f5txt, 0.5, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame4+=4').to(avastin_logo, 0.5, {
    opacity: 1,
    ease: Power0.easeIn
  }, 'frame4+=4').to(tecentriq_logo, 0.5, {
    width: 177,
    x: -438,
    y: 33,
    ease: Power0.easeIn
  }, 'frame4+=4').add(function () {
    finishedAnimation();
  }, 'frame4+=5');
  $('#ctaBlock').hover(function () {
    $(this).css({
      'transform': 'scale(1.1)',
      'transition': '0.3s ease-out'
    });
  }, function () {
    $(this).css({
      'transform': 'scale(1)',
      'transition': '0.3s ease-out'
    });
  }); // Exits Listeners

  $('#ctaBlock').click(function (e) {
    Enabler.exit('clickTag1', clickTag1);
  });
  $('#medlink').click(function (e) {
    Enabler.exit('clickTag2', clickTag2);
  });
  $('.pres-link').click(function (e) {
    e.preventDefault();
    Enabler.exit('clickTag3', clickTag3);
  });
  $('.medguide-link').click(function (e) {
    e.preventDefault();
    Enabler.exit('clickTag4', clickTag4);
  });
};