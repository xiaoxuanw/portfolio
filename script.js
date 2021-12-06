//cursor animation
var cursor = $(".cursor");

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {

        TweenMax.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});
var scrollTop     = $(window).scrollTop(),
    elementOffset = $('.horizontal').offset().top,
    distance      = (elementOffset - scrollTop);

$(document).on("mousemove", function(e) {

    mouseX = e.pageX - 50;
    mouseY = e.pageY- 50 ;
    console.log(MouseY)

});

$(".clickable-item").on("mouseenter", function() {
    cursor.addClass("active")
});

$(".clickable-item").on("mouseleave", function() {
    cursor.removeClass("active")
});




lazyload();




gsap.registerPlugin(ScrollTrigger);

let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });

bodyScrollBar.setPosition(0, 0);
bodyScrollBar.track.xAxis.element.remove();

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
    }
});

bodyScrollBar.addListener(ScrollTrigger.update);





const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function(sec, i) {

    var thisPinWrap = sec.querySelector('.pin-wrap');
    var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

    var getToValue = () => -(2600 - window.innerWidth);
    console.log(thisAnimWrap.scrollWidth)
    console.log(window.innerWidth)

    gsap.fromTo(thisAnimWrap, {
        x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
    }, {
        x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
        ease: "none",
        scrollTrigger: {
            trigger: sec,
            scroller: document.body, // neccessary setting for smooth-scrollbar on body
            pinType: 'transform', // neccessary setting for smooth-scrollbar on body
            start: "top top",
            end: () => "+=" + 2600,
            pin: thisPinWrap,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            scrub: true,
            //markers: true,
        }
    });

});






// This part is only necessary if you're using ScrollTrigger's markers:
if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
    bodyScrollBar.addListener(({ offset }) => gsap.set(markers, { marginTop: -offset.y }));
}
// End section necessary only if you're using ScrollTrigger's markers