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

let sliederWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .08;
let slider = document.querySelector('.frame')

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function setTransform(el, transform) {
    el.style.transform = transform;
}


function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = document.querySelector('.camera').offsetTop
    setTransform(slider, `translateX(-${current -550}px)`)
    requestAnimationFrame(animate);

}

lazyload();




// horizontal scroll
$(function() {
    // var tween = TweenMax.to('.frame', 6, { x: -1500, ease: Linear.easeNone })
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({ triggerElement: ".track", duration: 200, offset: 800, triggerHook: 1 })
    animate() // .setPin(".frame")
        .addIndicators({ name: "tween css class" }) // add indicators (requires plugin)
        .addTo(controller);

})