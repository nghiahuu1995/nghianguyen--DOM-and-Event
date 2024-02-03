// 'use strict';

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improvement <button class="btn btn--close-cookie">Got it!</button>';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnBackToTop = document.querySelector('.btn--back-to-top');
const header = document.querySelector('.header');
const section = document.querySelector('.section');
const h1 = document.querySelector('h1');
const section1 = document.querySelector('#section--3');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnBackToTop.addEventListener('click', function (e) {
  header.scrollIntoView({ behavior: 'smooth' });
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getClientRects();
  const s2coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Remove active tab content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');
const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) {
        logo.style.opacity = opacity;
        e.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    btnBackToTop.style.display = 'block';
  } else {
    nav.classList.remove('sticky');
    btnBackToTop.style.display = 'none';
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '0px',
});
headerObserver.observe(header);
const allSections = document.querySelectorAll('.section');
/// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const loadImages = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.1,
  rootMargin: '-200px',
});

const images = document.querySelectorAll('img[data-src]');
images.forEach(img => imgObserver.observe(img));

let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const arrowLeft = document.querySelector('.slider__btn--left');
const arrowRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;
// Slider

const slider = function () {
  const leftHandler = () => {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const rightHandler = () => {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const goToSlide = curSlide => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
  };
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    goToSlide(curSlide);
    createDots();
    activateDot(curSlide);
  };
  init();

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      let slide = +e.target.dataset.slide;
      curSlide = slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') rightHandler();
    e.key === 'ArrowLeft' && leftHandler();
  });
  arrowLeft.addEventListener('click', () => leftHandler());
  arrowRight.addEventListener('click', () => rightHandler());
};
slider();

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(`HTML parsed and tree built!`, e);
});

window.addEventListener('load', function (e) {
  console.log(`Fully loaded`);
});
