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
        }
    });


    //
    // Timeline Animation
    //

    tl.addLabel('frame1', '+=0')
        .to(actor, 0.5, { opacity: 0, ease: Power0.easeIn }, 'frame1+=1')

        .addLabel('frame2', '+=0')
        .to(f1bg, 2, { scale: 1.26, x: 83, y: 32, ease: Power0.easeIn }, 'frame2+=0')
        .to(f2txt, 1, { opacity: 1, ease: Power0.easeIn }, 'frame2+=1')

        .addLabel('frame3', '+=1.5')
        .to(f2txt, 0.5, { opacity: 0, ease: Power0.easeIn }, 'frame3+=1')
        .to(f3gradient, 0.5, { opacity: 1, ease: Power0.easeIn }, 'frame3+=1')
        .to(f3txt, 0.5, { opacity: 1, ease: Power0.easeIn }, 'frame3+=1')
        .to(f4txt, 1, { opacity: 1, ease: Power0.easeIn }, 'frame3+=2')
        .to(ctaBlock, 1, { opacity: 1, ease: Power0.easeIn }, 'frame3+=3')

        .addLabel('frame4', '+=0')
        .to([f1bg], 0, { opacity: 0, ease: Power0.easeIn }, 'frame4+=0')
        .to([f3txt, f4txt, f3gradient], 0.5, { opacity: 0, ease: Power0.easeIn }, 'frame4+=4')
        .to(f5gradient, 0.5, { opacity: 1, ease: Power0.easeIn }, 'frame4+=4')
        .to(f5txt, 0.5, { opacity: 1, ease: Power0.easeIn }, 'frame4+=4')
        .to(avastin_logo, 0.5, { opacity: 1, ease: Power0.easeIn }, 'frame4+=4')
        .to(tecentriq_logo, 0.5, { width:177, x: -438, y:33, ease: Power0.easeIn }, 'frame4+=4')

        .add(function() {
            finishedAnimation();
        }, 'frame4+=5');

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
