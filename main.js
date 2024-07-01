'use strict';
let moreBtn = document.querySelector('.more-btn');
let nav = document.querySelector('.nav');
let section1 = document.querySelector('.section1');
let header = document.querySelector('.header');
let sections = document.querySelectorAll('.section');

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
    entry.target.classList.remove('hidden-section');
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
