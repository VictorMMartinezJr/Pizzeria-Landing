"use strict";

const iconBurger = document.querySelector(".burger");
const iconBurgerLines = document.querySelectorAll(".burger-line");
const iconBlob = document.querySelector(".blob");
const navLinks = document.querySelector(".nav-links");
const pizzaImg = document.querySelector(".hero-img-pizza");

// Fires when burger icon is clicked
iconBurger.addEventListener("click", () => {
  iconBlob.classList.toggle("active");
  iconBurgerLines.forEach((line) => line.classList.toggle("active"));
  navLinks.classList.toggle("active");
});

// Close NavLinks on window scroll if open
window.addEventListener("scroll", () => {
  if (!iconBlob.classList.contains("active")) return;

  iconBlob.classList.remove("active");
  iconBurgerLines.forEach((line) => line.classList.remove("active"));
  navLinks.classList.remove("active");
});

// Barba JS
const tlLeave = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlEnter = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

// Animation out for the current page
const leaveAnimation = (current, done) => {
  const pizzaImg = current.querySelector(".hero-img-pizza");
  const title = current.querySelector(".hero-pizza-info");
  const arrow = current.querySelector(".hero-right-arrow");
  const price = current.querySelector(".hero-pizza-price");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 200 }),
    tlLeave.fromTo(price, { opacity: 1, x: 0 }, { opacity: 0, x: 100 }, "<"),
    tlLeave.fromTo(title, { x: 0, opacity: 1 }, { x: 100, opacity: 0 }, "<"),
    tlLeave.fromTo(pizzaImg, { x: 0 }, { x: 800, onComplete: done }, "<")
  );
};

// Animation in for the next page
const enterAnimation = (current, done) => {
  const pizzaImg = current.querySelector(".hero-img-pizza");
  const title = current.querySelector(".hero-pizza-info");
  const arrow = current.querySelector(".hero-right-arrow");
  const price = current.querySelector(".hero-pizza-price");

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }),
    tlEnter.fromTo(price, { opacity: 0, x: -100 }, { opacity: 1, x: 0 }, "<"),
    tlEnter.fromTo(title, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "<"),
    tlEnter.fromTo(pizzaImg, { x: -800 }, { x: 0, onComplete: done }, "<")
  );
};

// Initialzie Barba JS
barba.init({
  // Cannot start new animation until current is over
  preventRunning: true,
  transitions: [
    {
      name: "default",
      leave(data) {
        // Waits for current animation to finish
        const done = this.async();
        // Gets current page
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        // Waits for current animation to finish
        const done = this.async();
        // Gets next page
        let next = data.next.container;
        enterAnimation(next, done);
      },
    },
  ],
});
