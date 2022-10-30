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
    } else if (Math.abs(this.maxScrollY) - Math.abs(this.y) < 1) {
      setTimeout(function () {// twice();
      }, 2000);
    }
  }); //
  // Timeline Animation
  //

  tl.addLabel('f1', '+=0.5');
  $('#wrapper1', '#wrapper').toggle();
  animate();

  function animate() {
    TweenLite.to(man, 0.3, {
      delay: '0.5',
      right: -250,
      ease: 'none'
    });
    TweenLite.to(frame2_bubble, 0.3, {
      delay: '0.3',
      scale: 1,
      opacity: 1,
      ease: Power1.easeOut,
      transformOrigin: 'center bottom'
    });
    TweenLite.to(frame2_txt, 0.4, {
      delay: '0.8',
      top: 0,
      opacity: 1,
      ease: 'none'
    });
    TweenLite.to(man, 0.3, {
      delay: '4.55',
      right: -500,
      ease: 'none'
    });
    TweenLite.to(frame2_bubble, 0.3, {
      delay: '4.5',
      scale: 0.8,
      opacity: 0,
      ease: Power1.easeOut,
      transformOrigin: 'center bottom'
    });
    TweenLite.to(frame2_txt, 0.1, {
      delay: '4.5',
      opacity: 0,
      ease: Power1.easeOut
    });
    TweenLite.to(doctor, 0.3, {
      delay: '4.9',
      left: 70,
      ease: 'none'
    });
    TweenLite.to(frame3_bubble, 0.3, {
      delay: '4.9',
      scale: 1,
      opacity: 1,
      ease: Power1.easeOut,
      transformOrigin: 'center bottom'
    });
    TweenLite.to(frame3_txt, 0.4, {
      delay: '4.9',
      top: 0,
      opacity: 1,
      ease: 'none'
    });
    TweenLite.to(ctaBlock, 0.4, {
      delay: '6.3',
      left: 488,
      opacity: 1,
      ease: 'none'
    });
    TweenLite.to(frame3_bubble, 0.3, {
      delay: '8.7',
      scale: 0.8,
      opacity: 0,
      ease: Power1.easeOut,
      transformOrigin: 'center bottom'
    });
    TweenLite.to(frame3_txt, 0.1, {
      delay: '8.7',
      opacity: 0,
      ease: Power1.easeOut
    });
    TweenLite.to(frame4, 0.5, {
      delay: '9.2',
      left: 185,
      ease: Power1.easeOut
    });
    TweenLite.to(frame4, 0.3, {
      delay: '12.7',
      opacity: 0,
      ease: Power1.easeOut
    });
    TweenLite.to(frame5, 0.5, {
      delay: '13.1',
      opacity: 1,
      ease: Power1.easeOut
    });
    TweenLite.to(frame5, 0.3, {
      delay: '14.1',
      ease: Power1.easeOut,
      onComplete: finishedAnimation
    });
  }

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