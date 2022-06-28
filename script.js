"use strict";

const iconBurger = document.querySelector(".burger");
const iconBurgerLines = document.querySelectorAll(".burger-line");
const iconBlob = document.querySelector(".blob");
const navLinks = document.querySelector(".nav-links");
const pizzaImg = document.querySelector(".hero-img-pizza");
const menuItems = document.querySelector(".menu-items");
const menuItemImg = document.querySelector(".menu-item-img");
const menuItemName = document.querySelector(".menu-item-name");
const menuItemCalories = document.querySelector(".menu-item-calories");
const menuItemInfo = document.querySelector(".menu-item-info");
const menuItemPrice = document.querySelector(".menu-item-price");

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

// MENU SECTION
const menuCategory = document.querySelectorAll(".menu-category");
const tlMenuItems = gsap.timeline({
  default: { duration: 5, ease: "Power2.easeOut" },
});

menuCategory.forEach((category) => {
  category.addEventListener("click", (_, id) => {
    // Remove active class from all menu categories
    menuCategory.forEach((category) => category.classList.remove("active"));
    // Add active class to clicked category
    category.classList.add("active");

    if (category.id === "0") {
      let menuItem;
      // Clear current items in menu
      menuItems.innerHTML = "";
      // Fetch new data for the menu items
      fetch("data/pizzaMenuData.json")
        .then((resp) => resp.json())
        .then((data) => {
          data.map((data) => {
            menuItems.insertAdjacentHTML(
              "beforeend",
              `
                      <div class="menu-item">
                    <img src=${data.img} alt="italian special pizza" class="menu-item-img" />
                    <span class="menu-item-titles">
                      <p class="menu-item-name">${data.name}</p>
                      <p class="menu-item-calories">${data.calories}</p>
                    </span>
                    <p class="menu-item-info">${data.info}</p>
                    <p class="menu-item-price">${data.price}</p>
                  </div>
            `
            );
          });

          tlMenuItems.fromTo(
            menuItems,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1 }
          );
        });
    } else if (category.id === "1") {
      // Clear current items in menu
      menuItems.innerHTML = "";
      // Fetch new data for the menu items
      fetch("data/drinksMenuData.json")
        .then((resp) => resp.json())
        .then((data) => {
          data.map((data) => {
            menuItems.insertAdjacentHTML(
              "beforeend",
              `
                      <div class="menu-item">
                    <img src=${data.img} alt="italian special pizza" class="menu-item-img" />
                    <span class="menu-item-titles">
                      <p class="menu-item-name">${data.name}</p>
                      <p class="menu-item-calories">${data.calories}</p>
                    </span>
                    <p class="menu-item-info">${data.info}</p>
                    <p class="menu-item-price">${data.price}</p>
                  </div>
            `
            );
          });

          tlMenuItems.fromTo(
            menuItems,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1 }
          );
        });
    }
  });
});

const fetchMenuPizzaData = (url) => {
  fetch(url).then();
};

const loadMenuItems = () => {
  fetch("data/pizzaMenuData.json")
    .then((resp) => resp.json())
    .then((data) => {
      data.map((data) => {
        menuItems.insertAdjacentHTML(
          "beforeend",
          `
                <div class="menu-item">
              <img src=${data.img} alt="italian special pizza" class="menu-item-img" />
              <span class="menu-item-titles">
                <p class="menu-item-name">${data.name}</p>
                <p class="menu-item-calories">${data.calories}</p>
              </span>
              <p class="menu-item-info">${data.info}</p>
              <p class="menu-item-price">${data.price}</p>
            </div>
      `
        );
      });
    });
};
loadMenuItems();
