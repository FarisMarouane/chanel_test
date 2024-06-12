const HEADER_HEIGHT = 56;
const HIDDEN_IMAGE_HEIGHT = 130;

document.addEventListener("scroll", (event) => {
    const windowScrollY = window.scrollY;
    const header = document.querySelector(".header__inner");
    const headerLevelOne = document.querySelector(".header__level-one");
    const headerLevelTwo = document.querySelector(".header__level-two");

    header.style = `translate: none; rotate: none; scale: none; transform: translate3d(0px, -${windowScrollY <= HEADER_HEIGHT ? windowScrollY : HEADER_HEIGHT}px, 0px);`;
    headerLevelOne.style = `translate: none; rotate: none; scale: none; transform: translate3d(0px, ${windowScrollY <= HEADER_HEIGHT ? windowScrollY : HEADER_HEIGHT}px, 0px);`;
    headerLevelTwo.style = `opacity: ${1 - ((windowScrollY <= HEADER_HEIGHT ? windowScrollY : HEADER_HEIGHT) / HEADER_HEIGHT)}`;
});


document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect logic
    showSlides(slideIndex);
    const giedreImg = document.querySelector(".image__giedre");
    const imariImg = document.querySelector(".image__imari");



    const giedreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleHeight = entry.intersectionRect.height;
                // giedreImg.style = `translate: none; rotate: none; scale: none; transform: translate3d(0px, ${visibleHeight <= HIDDEN_IMAGE_HEIGHT ? -HIDDEN_IMAGE_HEIGHT + visibleHeight : 0}px, 0px);`;
                giedreImg.style = `background-position-y: ${visibleHeight <= HIDDEN_IMAGE_HEIGHT ? -HIDDEN_IMAGE_HEIGHT + visibleHeight : 0}px;`;
            }
        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    });

    const imariObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate the visible height of the element
                const visibleHeight = entry.intersectionRect.height;
                imariImg.style = `background-position-y: ${visibleHeight <= HIDDEN_IMAGE_HEIGHT ? -HIDDEN_IMAGE_HEIGHT + visibleHeight : 0}px;`;
            }
        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    });

    giedreObserver.observe(giedreImg);
    imariObserver.observe(imariImg);
});


// Slide show logic
let slideIndex = 1;

function changeSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let sliderNavigationArrows = document.getElementsByClassName("slider__arrow__container");
    let sliderNavigationMobileArrows = document.getElementsByClassName("slider__arrow__container-mobile");
    let sliderCounter = document.querySelector(".slider-pagination");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slideIndex === 1) {
        sliderNavigationArrows[0].style.visibility = "hidden";
        sliderNavigationArrows[1].style.visibility = "visible";
        sliderNavigationMobileArrows[0].style.visibility = "hidden";
        sliderNavigationMobileArrows[1].style.visibility = "visible";
    } else if (slideIndex === slides.length) {
        sliderNavigationArrows[0].style.visibility = "visible";
        sliderNavigationArrows[1].style.visibility = "hidden";
        sliderNavigationMobileArrows[0].style.visibility = "visible";
        sliderNavigationMobileArrows[1].style.visibility = "hidden";
    } else {
        sliderNavigationArrows[0].style.visibility = "visible";
        sliderNavigationArrows[1].style.visibility = "visible";
        sliderNavigationMobileArrows[0].style.visibility = "visible";
        sliderNavigationMobileArrows[1].style.visibility = "visible";
    }

    slides[slideIndex - 1].style.display = "flex";
    sliderCounter.innerHTML = `${slideIndex}/${slides.length}`;
}