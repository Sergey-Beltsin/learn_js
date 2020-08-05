function slider({container, slide, nextArrow, prevArrow, currentCounter, totalCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          slidePrev = document.querySelector(prevArrow),
          slideNext = document.querySelector(nextArrow),
          slideCurrent = document.querySelector(currentCounter),
          slideTotal = document.querySelector(totalCounter),
          slideWrapper = document.querySelector(wrapper),
          slideField = document.querySelector(field),
          width = window.getComputedStyle(slideWrapper).width,
          dotsWrapper = document.createElement('ul');
          
    let slideIndex = 1,
        offset = 0,
        dots = [];

    function slideIndicator() {
        if (slides.length < 10) {
            slideCurrent.textContent = `0${slideIndex}`;
        } else {
            slideCurrent.textContent = slideIndex;
        }
    }

    function replaceWords(element) {
        return +element.replace(/\D/g, '');
    }
        
    slideIndicator();

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach(slides => {
        slides.style.width = width;
    });

    slider.style.position = 'relative';

    dotsWrapper.classList.add('carousel-indicators');
    dotsWrapper.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(dotsWrapper);

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dotsWrapper.append(dot);
        dots.push(dot);
    }

    slideNext.addEventListener('click', () => {
        if (offset == replaceWords(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += replaceWords(width);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideIndicator();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    slidePrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = replaceWords(width) * (slides.length - 1);
        } else {
            offset -= replaceWords(width);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideIndicator();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = replaceWords(width) * (slideTo - 1);

            slideField.style.transform = `translateX(-${offset}px)`;
            
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

            slideIndicator();
        });
    });
}

export default slider;