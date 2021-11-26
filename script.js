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

// horizontal scroll
var tween = TweenMax.to('.frame', 1, { x: -1600 })
var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({ triggerElement: ".track", duration: 400, offset: 800, triggerHook: 1 })
    .setTween(tween)
    // .setPin(".frame")
    // .addIndicators({ name: "tween css class" }) // add indicators (requires plugin)
    .addTo(controller);


//parallex 

$(function() { // wait for document ready
    // build tween
    var tween1 = new TimelineMax()
        .add([
            TweenMax.to(".track .frame", 1, { backgroundPosition: "-500% 0", ease: Linear.easeNone }),
        ]);

    // build scene
    var scene = new ScrollMagic.Scene({ triggerElement: ".track", duration: 400, offset: 800 })
        .setTween(tween1)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

})

// const observer = new IntersectionObserver(entries => {
//     // Loop over the entries
//     entries.forEach(entry => {
//         // If the element is visible
//         if (entry.isIntersecting) {
//             // Add the animation class


//         }
//         // frame.classList.remove('frame-animation');

//     });
// }); observer.observe(document.querySelector('.track'));

// var rellax = new Rellax('.rellax')