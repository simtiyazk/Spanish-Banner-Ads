/* eslint-disable no-undef */

/**
 *
 * start animating
 *
 **/

App_banner.fn.anima = function() {
    // isi clone, NOTE: if you want to see a copy of the ISI next to the banner uncomment the follow line
    // $('#isi').clone().addClass('uat').attr('id', 'isi-clone').appendTo('body');

    // Variables
    const tl = new TimelineMax();
    const isi = $('.isi');
    const isiMain = $('#isiMain');
    const isiWrapper = $('#isi_wrapper');
    const initialScrollSpeed = 260000;
    const scrollToTop = true; // Set to false if you do not need to scroll to the top when the auto scroll finished
    let myScroll = null;
    let scrollBar = null;
    let scrollSpeed = 0;
    let scrolledPercentage = 0;
    let isiHeight = 0;
    let isiFinished = false;
    let animationFinished = false;
    let isAnimating = true;
    let scrollWrapHeight = isiWrapper.clientHeight;

    // Assign timeline to window to be able to test.
    window.tl = tl;

    // Scroll init function. Keep disable options as they
    function initScrollBars() {
        myScroll = new IScroll('#isi_wrapper', {
            scrollbars: 'custom',
            interactiveScrollbars: true,
            mouseWheel: true,
            momentum: true,
            click: true,
            disablePointer: true,
            disableTouch: false,
            disableMouse: false,
        });

        window.myScroll = myScroll;

        scrollBar = $('.iScrollVerticalScrollbar');
    }

    function scrollSetUp(e) {
        myScroll.scrollBy(0, 0, 1, {
            fn: function(k) {
                return k;
            },
        });
    }

    function finishedAnimation() {
        animationFinished = true;
        startScroll();
    }

    function startScroll() {
        scrollWrapHeight = $('#isi_wrapper').outerHeight(),
        isiHeight = -1 * (isi.outerHeight() - scrollWrapHeight),
        scrolledPercentage = myScroll.y * 100 / isiHeight,
        scrollSpeed = initialScrollSpeed - (initialScrollSpeed * (scrolledPercentage / 100));

        myScroll.refresh();
        setTimeout(function() {
            if (scrolledPercentage >= 100) {
                isiFinished = true;
            }
            myScroll.scrollTo(0, isiHeight, scrollSpeed, {
                fn: function(k) {
                    return k;
                },
            });
        }, 300);
    }

    function stopScroll() {
        myScroll.isAnimating = false; // stop animation
    }

    // scroll init
    initScrollBars();

    isi.on('click', function() {
        if (animationFinished) {
            if (myScroll.isAnimating) {
                stopScroll();
            } else {
                startScroll();
            }
        }
    });

    myScroll.on('scrollStart', function() {
        if (animationFinished) {
            if (myScroll.isAnimating) {
                stopScroll();
            }
        }
    });

    myScroll.on('scrollEnd', function() {
        if (isAnimating) {
            isAnimating = false;
            animationFinished = true;
            setTimeout(function() {
                myScroll.scrollTo(0, 0);
            }, 10);
        } else if (Math.abs(this.maxScrollY) - Math.abs(this.y) < 1) {
            setTimeout(function() {
                // twice();
            }, 2000);
        }
    });


    //
    // Timeline Animation
    //

    tl.addLabel('f1', '+=0.5');
    $('#wrapper1', '#wrapper').toggle();
    animate();
    function animate() {
        TweenLite.to(man, 0.3, { delay: '0.5', right: 0, ease: 'none' });
        TweenLite.to(frame2_bubble, 0.3, { delay: '0.3', scale: 1.2, opacity: 1, ease: Power1.easeOut, transformOrigin: 'center bottom' });
        TweenLite.to(frame2_txt, 0.4, { delay: '0.8', top: 0, opacity: 1, ease: 'none' });

        TweenLite.to(man, 0.3, { delay: '4.55', right: -150, ease: 'none' });
        TweenLite.to(frame2_bubble, 0.3, { delay: '4.5', scale: 0.8, opacity: 0, ease: Power1.easeOut, transformOrigin: 'center bottom' });
        TweenLite.to(frame2_txt, 0.1, { delay: '4.5', opacity: 0, ease: Power1.easeOut });

        TweenLite.to(doctor, 0.3, { delay: '4.9', right: -40, ease: 'none' });
        TweenLite.to(frame3_bubble, 0.3, { delay: '4.9', scale: 1, opacity: 1, ease: Power1.easeOut, transformOrigin: 'center bottom' });
        TweenLite.to(frame3_txt, 0.4, { delay: '4.9', top: 0, opacity: 1, ease: 'none' });
        TweenLite.to(ctaBlock, 0.4, { delay: '6.3', left: 9, opacity: 1, ease: 'none' });

        
        TweenLite.to(frame3_bubble, 0.3, { delay: '8.7', scale: 0.8, opacity: 0, ease: Power1.easeOut, transformOrigin: 'center bottom' });
        TweenLite.to(frame3_txt, 0.1, { delay: '8.7', opacity: 0, ease: Power1.easeOut });

        TweenLite.to(frame4, 0.5, { delay: '9.2', left: 12, ease: Power1.easeOut });
        TweenLite.to(frame4, 0.3, { delay: '12.7', opacity: 0, ease: Power1.easeOut });

        
        TweenLite.to(frame5, 0.5, { delay: '13.1', opacity: 1, ease: Power1.easeOut });
        TweenLite.to(frame5, 0.3, { delay: '14.1', ease: Power1.easeOut, onComplete: finishedAnimation });
    }

    $('#ctaBlock').hover(function() {
        $(this).css({ 'transform': 'scale(1.1)', 'transition': '0.3s ease-out' });
    }, function() {
        $(this).css({ 'transform': 'scale(1)', 'transition': '0.3s ease-out' });
    });

    // Exits Listeners
    $('#ctaBlock').click(function(e) {
        Enabler.exit('clickTag1', clickTag1);
    });

    $('#medlink').click(function(e) {
        Enabler.exit('clickTag2', clickTag2);
    });

    $('.pres-link').click(function(e) {
        e.preventDefault();
        Enabler.exit('clickTag3', clickTag3);
    });

    $('.medguide-link').click(function(e) {
        e.preventDefault();
        Enabler.exit('clickTag4', clickTag4);
    });
};
