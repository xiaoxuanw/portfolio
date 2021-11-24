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
const frame = document.querySelector('.frame')

// window.addEventListener('scroll', () => {
//     var scrolled = window.pageYOffset;
//     console.log(scrolled)

//     const val = scrolled * 0.6;
//     frame.style.transform = `translateX(${0.45*val}px)`
// })

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            // Add the animation class
            TweenMax.to('.frame', 1, { x: -600 })

            // frame.style.transform = "translateX(-500px)";


            frame.classList.add('frame-animation');
        }
        // frame.classList.remove('frame-animation');

    });
});
observer.observe(document.querySelector('.track'));
TweenMax.to('.frame', 1, { x: -600 })

var scene = new ScrollMagic.Scene({ triggerElement: ".track", duration: 200, offset: -50 })
    .setTween(tween)
    .addIndicators({ name: "tween css class" }) // add indicators (requires plugin)
    .addTo(controller);