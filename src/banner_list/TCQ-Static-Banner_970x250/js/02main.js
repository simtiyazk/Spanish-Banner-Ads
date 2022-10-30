
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
    const placeholder = $('.animation-placeholder');
    const cta = $('#cta');
    const isiMain = $('#isi-main');
    const mainExit = $('#main-panel');
    let myScroll;
    let scrollBar;
    let scrollSpeed;
    let scrolledPercentage;
    let scrollWrapHeight;
    let isiHeight;
    let scrollSetUp;
    const intialScrollSpeed = 90000;
    const animationFinished = false;

    // Assign timeline to window to be able to test.
    window.tl = tl;

    //
    // Timeline Animation
    //


    // Exits Listeners
    //mainExit.on('click', App_banner.fn.mainExitHandler);
    cta.on('click', App_banner.fn.ctaExitHandler);
};

// Main Exit Handler
App_banner.fn.ctaExitHandler = function(e) {
    e.preventDefault();
    Enabler.exit('clickTag1', clickTag1);
};
// CTA Exit Handler
// App_banner.fn.ctaExitHandler = function(e) {
//     e.preventDefault();
//     Enabler.exit('clickTag2', clickTag2);
// };

// SET IDS IN DOM TO GLOBAL VARIABLES
function IDsToVars() {
    const allElements = document.getElementsByTagName('id');

    for (let q = 0; q < allElements.length; q++) {
        const el = allElements[q];
        if (el.id) {
            window[el.id] = document.getElementById(el.id);
        }
    }
};
