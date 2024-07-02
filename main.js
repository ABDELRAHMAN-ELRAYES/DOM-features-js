'use strict';
let moreBtn = document.querySelector('.more-btn');
let nav = document.querySelector('.nav');
let section1 = document.querySelector('.section1');
let header = document.querySelector('.header');
let sections = document.querySelectorAll('.section');
let blurImgs = document.querySelectorAll('.feature-img');
let operationsBtns = document.querySelector('.operations-btn');
let tabbedDivs = document.querySelectorAll('.tabbed-div');
let slides = document.querySelectorAll('.slide');
let nxtSliderBtn = document.querySelector('.right-slide');
let prvSliderBtn = document.querySelector('.left-slide');
let dots = document.querySelector('.dots');

//to make the nav bar appear after passing the first section(header) to easily move
// window.addEventListener('scroll', () => {
//   window.pageYOffset > window.innerHeight
//     ? nav.classList.add('sticky-nav')
//     : nav.classList.remove('sticky-nav');
// });

// same as previous but using intersection observer api
let obsCallback = function (entries) {
  let [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky-nav');
  else nav.classList.add('sticky-nav');
};
let obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

// make a section appear when arrive to it
let secCallback = function (entries, observer) {
  let [entry] = entries;
  if (entry.isIntersecting) {
    // entry.target.classList.remove('hidden-section');
    observer.unobserve(entry.target);
  }
};
let secOptions = {
  root: null,
  threshold: 0.15,
};
const secObserver = new IntersectionObserver(secCallback, secOptions);
sections.forEach(function (section) {
  secObserver.observe(section);
});

// non blur the imgs in feature section
let blurCallback = function (entries, observer) {
  let [entry] = entries;
  let elm = entry.target;
  let newSrc = elm.dataset.src;
  if (entry.isIntersecting) {
    elm.src = newSrc;
    elm.addEventListener('load', () => {
      elm.classList.remove('img-blur');
    });
    observer.unobserve(elm);
  }
};
let blurOptions = {
  root: null,
  threshold: 0.15,
};
let blurObserver = new IntersectionObserver(blurCallback);
blurImgs.forEach(img => {
  blurObserver.observe(img);
});
//implement operations slider throw btns
operationsBtns.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn')) {
    let siblings = Array.from(e.target.parentNode.children);
    siblings.forEach(sib => {
      sib.classList.remove('active-opt-btn');
    });
    e.target.classList.add('active-opt-btn');

    tabbedDivs.forEach(sec => {
      sec.classList.add('hidden');
      sec.classList.remove('active-tabbed-div');
    });
    let className = `tabbed-div${e.target.dataset.number}`;
    document.querySelector(`.${className}`).classList.add('active-tabbed-div');
  }
});
// warn the user that his data will be lost if close the website
window.addEventListener('beforeunload', e => {
  e.preventDefault();
  e.returnValue = '';
});
//make the slider

let curSlide = 0;

let goToSlide = function (cur) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - cur)}%)`;
  });
};
slides.forEach((slid, i) => {
  let dot = `<div class="dot" data-slide-number=${i}></div>`;
  dots.insertAdjacentHTML('beforeend', dot);
});

let updateActiveDot = function (curDot) {
  let activeDot = dots.querySelector(`.dot[data-slide-number="${curDot}"]`);
  Array.from(dots.children).forEach(child => {
    child.classList.remove('active-dot');
  });
  activeDot.classList.add('active-dot');
};
// slides.forEach((slide, i) => {
//   slide.style.transform = `translateX(${100 * i}%)`;
// });
updateActiveDot(0);
goToSlide(0);
nxtSliderBtn.addEventListener('click', () => {
  if (curSlide === slides.length - 1) curSlide = 0;
  else ++curSlide;
  // slides.forEach((slide, i) => {
  //   slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  // });
  goToSlide(curSlide);
  updateActiveDot(curSlide);
});
prvSliderBtn.addEventListener('click', () => {
  if (curSlide === 0) curSlide = slides.length - 1;
  else --curSlide;
  // slides.forEach((slide, i) => {
  //   slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  // });
  goToSlide(curSlide);
  updateActiveDot(curSlide);
});

dots.addEventListener('click', event => {
  if (event.target.classList.contains('dot')) {
    goToSlide(Number(event.target.dataset.slideNumber));
    Array.from(event.target.parentNode.children).forEach(child => {
      child.classList.remove('active-dot');
    });
    event.target.classList.add('active-dot');
  }
});
