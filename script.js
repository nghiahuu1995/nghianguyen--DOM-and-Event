// 'use strict';

///////////////////////////////////////
// Modal window
const message = document.createElement('div');

message.classList.add('cookie-message');
// message.textContent = `We use cookied for improvement`;
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
  // console.log(s1coords, s2coords, e.target.getBoundingClientRect());
  // console.log('Current Scroll X/Y', s2coords.top, s2coords.left);
  // console.log('Current Scroll X/Y', window.scrollX, scrollY);

  // window.scrollTo(
  //   s2coords.top + window.scrollX,
  //   s2coords.left + window.scrollY
  // );
  // window.scrollTo({
  //   top: s2coords.top + window.scrollY,
  //   left: s2coords.left + window.scrollX,
  //   behavior: 'smooth', // Optionally, you can use 'auto' for instant scrolling
  // });
});

////// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (ele) {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });
// 1. Add event listener to common parent element
// 2. Determine whatt element orginated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// console.log(modal.querySelectorAll('.highlight'));
// console.log(h1.firstChild);
// console.log((h1.firstElementChild.style.color = 'orangered'));
// console.log((h1.lastElementChild.style.color = 'blue'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) e.style.transform = 'scale(0.5)';
// });

//// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(tab => tab.addEventListener('click', () => console.log(tab))); // will slow down if have too many tabs
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // console.log(clicked.dataset.tab);
  // remove active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area

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
// nav.addEventListener('mouseover', handleHover.bind(null, 0.5));
// nav.addEventListener('mouseout', handleHover.bind(null, 1));
///////////////////
const s1coords = section.getBoundingClientRect();
// console.log(s1coords, s1coords.height, window.outerHeight);
// window.addEventListener('scroll', function () {
//   //console.log(window.scrollY);

//   // if (this.window.scrollY <= s1coords.height) {
//   //   btnBackToTop.style.display = 'none';
//   //   nav.classList.remove('sticky');
//   // } else {
//   //   nav.classList.add('sticky');
//   //   btnBackToTop.style.display = 'block';
//   // }
//   this.window.scrollY <= s1coords.height
//     ? ((btnBackToTop.style.display = 'none'), nav.classList.remove('sticky'))
//     : (nav.classList.add('sticky'), (btnBackToTop.style.display = 'block'));
// });

// Observer intersection

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       nav.classList.add('sticky');
//       btnBackToTop.style.display = 'block';
//     } else {
//       btnBackToTop.style.display = 'none';
//       nav.classList.remove('sticky');
//     }
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// console.log(observer.observe(section));
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
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
  // console.log(entry);
  if (!entry.isIntersecting) return;
  // entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
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
  // section.classList.add('section--hidden');
});
const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.1,
  rootMargin: '-200px',
});
// const images = document.querySelectorAll('.lazy-img');
const images = document.querySelectorAll('img[data-src]');
images.forEach(img => imgObserver.observe(img));
// console.log(images);

// Slider
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(1)';
// slider.style.overflow = 'visible';
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
  // startSlideshow();

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

  // const startSlideshow = () => {
  //   setInterval(() => rightHandler(), 5000); // Change slide every 1000ms (1 second)
  // };
};
slider();

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(`HTML parsed and tree built!`, e);
});

window.addEventListener('load', function (e) {
  console.log(`Fully loaded`);
});
// Should be used when user in the middle of filling out the form
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
// document.querySelector('.header').append(message.cloneNode(true));
// document.querySelector('.header').prepend(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.parentElement.removeChild(message); old way
//     message.remove();
//   });

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(getComputedStyle(message).height);
// // console.log(getComputedStyle(message));

// message.style.height =
//   parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// console.log(getComputedStyle(message).height);
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //attributes
// const logo = document.querySelector('.nav__logo');
// const link = document.querySelector('.nav__link--btn');
// // console.log(logo.setAttribute('src', 'img/card.png'));
// // console.log(logo.src); // absolute path 13-Advanced-DOM-Bankist/starter/img/logo.png
// // console.log(logo.getAttribute('src')); //relative path #

// // console.log(logo.alt);
// // console.log(logo.className);

// // console.log(link.href); //absolute path 13-Advanced-DOM-Bankist/starter/img/logo.png
// // console.log(link.getAttribute('href')); //relative path #

// // Non-standard
// // console.log(logo.designer);
// // console.log(logo.getAttribute('designer'));
// //data attributes
// /* <img
//           src="img/logo.png"
//           alt="Bankist logo"
//           class="nav__logo"
//           id="logo"
//           designer="Nghia"
//           data-version-number="3.0"
//         /> Use camelCase .dataset.versionNumber*/
// // console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't use, it will overwrite existed classes
// logo.className = 'Nghia';

// // Prefered way
// // can add more events, can also remove event
// const alertH1 = function (e) {
//   console.log(e, 'You are reading the heading 1');
//   // h1.removeEventListener('mouseenter', alertH1);
// };
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// // Old way
// // h1.onmouseenter = e => {
// //   alert(123);
// // };

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('Link', e.target);
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('container', e.target);
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('nav', e.target);
//   this.style.backgroundColor = randomColor();
// });
