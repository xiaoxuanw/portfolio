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

$(document).on("mousemove", function(e) {
    mouseX = e.pageX - 50;
    mouseY = e.pageY - 50;
});

$(".clickable-item").on("mouseenter", function() {
    cursor.addClass("active")
});

$(".clickable-item").on("mouseleave", function() {
    cursor.removeClass("active")
});


//smooth scroll

// let sliderWidth;
// let imageWidth;
// let current = 0;
// let target = 0;
// let ease = .08;
// let slider = document.querySelector('.frame')

// function lerp(start, end, t) {
//     return start * (1 - t) + end * t;
// }

// function setTransform(el, transform) {
//     el.style.transform = transform;
// }


// function animate() {
//     current = parseFloat(lerp(current, target, ease)).toFixed(2);
//     target = document.querySelector('.camera').offsetTop
//     setTransform(slider, `translateX(-${current-560}px)`)
//     requestAnimationFrame(animate);

// }

lazyload();




// // horizontal scroll
// $(function() {
//     var tween = TweenMax.to('.frame', 6, { x: -1500, })
//     var controller = new ScrollMagic.Controller();

//     var scene = new ScrollMagic.Scene({ triggerElement: ".track", duration: 800, offset: 800, triggerHook: 1 })
//         .setTween(tween) // .setPin(".frame")
//         .addIndicators({ name: "tween css class" }) // add indicators (requires plugin)
//         .addTo(controller);

// })
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

    var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

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
            end: () => "+=" + thisAnimWrap.scrollWidth,
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