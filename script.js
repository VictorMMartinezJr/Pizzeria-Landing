"use strict";

const iconBurger = document.querySelector(".burger");
const iconBurgerLines = document.querySelectorAll(".burger-line");
const iconBlob = document.querySelector(".blob");
const navLinks = document.querySelector(".nav-links");
const heroPizzaSubtitle = document.querySelector(".hero-pizza-subtitle");
const heroPizzaName = document.querySelector(".hero-pizza-name");
const heroPizzadDescription = document.querySelector(".hero-pizza-description");
const heroPizzadPrice = document.querySelector(".hero-pizza-price");
const heroOrderBtn = document.querySelector(".hero-order-btn");
const heroPizza = document.querySelector(".hero-img-pizza");
const menuItems = document.querySelector(".menu-items");
const menuItemImg = document.querySelector(".menu-item-img");
const menuItemName = document.querySelector(".menu-item-name");
const menuItemCalories = document.querySelector(".menu-item-calories");
const menuItemInfo = document.querySelector(".menu-item-info");
const menuItemPrice = document.querySelector(".menu-item-price");

// Hero section animations on page load
const tlLoadHero = gsap.timeline({
  default: { ease: "Power2.easeOut" },
});
tlLoadHero.fromTo(
  heroPizzaSubtitle,
  { y: 200, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.65 }
);
tlLoadHero.fromTo(
  heroPizzaName,
  { y: 200, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.65 },
  "<50%"
);
tlLoadHero.fromTo(
  heroPizzadDescription,
  { y: 200, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.65 },
  "<50%"
);
tlLoadHero.fromTo(
  heroPizzadPrice,
  { y: 200, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.65 },
  "<50%"
);
tlLoadHero.fromTo(
  heroOrderBtn,
  { y: 200, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.65 },
  "<50%"
);
tlLoadHero.fromTo(heroPizza, { opacity: 0 }, { opacity: 1, duration: 0.65 });

// Fires when burger icon is clicked
iconBurger.addEventListener("click", () => {
  iconBlob.classList.toggle("active");
  iconBurgerLines.forEach((line) => line.classList.toggle("active"));
  navLinks.style = "";
  navLinks.classList.toggle("active");
});

// Close NavLinks on window scroll if open
window.addEventListener("scroll", () => {
  if (!iconBlob.classList.contains("active")) return;

  iconBlob.classList.remove("active");
  iconBurgerLines.forEach((line) => line.classList.remove("active"));
  navLinks.classList.remove("active");
});

//////////////
// BARBA JS //
//////////////
const tlLeave = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlEnter = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

// Animation out for the current page
const leaveAnimation = (current, done) => {
  const heroPizza = current.querySelector(".hero-img-pizza");
  const title = current.querySelector(".hero-pizza-info");
  const arrow = current.querySelector(".hero-right-arrow");
  const price = current.querySelector(".hero-pizza-price");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 200 }),
    tlLeave.fromTo(price, { opacity: 1, x: 0 }, { opacity: 0, x: 100 }, "<"),
    tlLeave.fromTo(title, { x: 0, opacity: 1 }, { x: 100, opacity: 0 }, "<"),
    tlLeave.fromTo(heroPizza, { x: 0 }, { x: 800, onComplete: done }, "<")
  );
};

// Animation in for the next page
const enterAnimation = (current, done) => {
  const heroPizza = current.querySelector(".hero-img-pizza");
  const title = current.querySelector(".hero-pizza-info");
  const arrow = current.querySelector(".hero-right-arrow");
  const price = current.querySelector(".hero-pizza-price");

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }),
    tlEnter.fromTo(price, { opacity: 0, x: -100 }, { opacity: 1, x: 0 }, "<"),
    tlEnter.fromTo(title, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "<"),
    tlEnter.fromTo(heroPizza, { x: -800 }, { x: 0, onComplete: done }, "<")
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

//////////////////
// MENU SECTION //
/////////////////
const menuCategory = document.querySelectorAll(".menu-category");
// HTML to add to menu items
const menuItemHTML = (data) => {
  return `
            <div class="menu-item">
              <img src=${data.img} alt=${data.alt} class="menu-item-pizza-img" />
              <span class="menu-item-titles">
                <p class="menu-item-name">${data.name}</p>
                <p class="menu-item-calories">${data.calories}</p>
              </span>
              <p class="menu-item-info">${data.info}</p>
              <p class="menu-item-price">${data.price}</p>
              <div class="menu-item-btns">
                <span class="sizes">
                  <button class="size" aria-label="select a small ${data.name} pizza">sm</button>
                  <button class="size" aria-label="select a medium ${data.name} pizza">md</button>
                  <button class="size" aria-label="select a large ${data.name} pizza">lg</button>
                </span>
                <button class="menu-item-add-to-order">ADD TO ORDER</button>
              </div>
            </div>
      `;
};

// GSAP tl defaults for menu card animation
const tlMenuItems = gsap.timeline({
  default: { ease: "Power2.easeOut" },
});

// Fetch the menu items data from local json files
const fetchMenuData = (fetchedData) => {
  // Clear current items in menu
  menuItems.innerHTML = "";
  // Fetch new data for the menu items
  fetch(fetchedData)
    .then((resp) => resp.json())
    .then((data) => {
      data.map((data) => {
        menuItems.insertAdjacentHTML("beforeend", menuItemHTML(data));
      });

      // GSAP enter animation on menu cards
      tlMenuItems.fromTo(
        menuItems,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 }
      );
      // Add event listener to size btns after data is fetched
      const btnSizes = document.querySelectorAll(".size");
      btnSizes.forEach((size) => {
        size.addEventListener("click", () => {
          btnSizes.forEach((btn) => btn.classList.remove("active"));
          size.classList.add("active");
        });
      });

      // Add event listener to addToOrderBtn
      const addToOrderBtn = document.querySelectorAll(
        ".menu-item-add-to-order"
      );
      addToOrderBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          btnSizes.forEach((btn) => btn.classList.remove("active"));
        });
      });
    });
};

menuCategory.forEach((category) => {
  category.addEventListener("click", (_, id) => {
    // Remove active class from all menu categories
    menuCategory.forEach((category) => category.classList.remove("active"));
    // Add active class to clicked category
    category.classList.add("active");

    if (category.id === "0") {
      // Get pizza menu items
      fetchMenuData("data/pizzaMenuData.json");
    } else if (category.id === "1") {
      // Get drinks menu items
      fetchMenuData("data/drinksMenuData.json");
    }
  });
});

// Inital menu items(pizza) on page load
const loadMenuItems = () => {
  fetchMenuData("data/pizzaMenuData.json");
};
loadMenuItems();

/*/////////////////////////
// INTERSECTION OBSERVER //
////////////////////////*/

// Fade up elements
const fadeUpElements = document.querySelectorAll(".fade-up");

// GSAP timeline defaults for fadeup animation
const tlFadeUpItems = gsap.timeline({
  default: { ease: "Power2.easeOut" },
});

const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // GSAP fadeup animation
      tlFadeUpItems.fromTo(
        entry.target,
        { opacity: 0, y: 200 },
        { opacity: 1, y: 0, duration: 1 }
      );
      fadeUpObserver.unobserve(entry.target); // Unobserve item when it fades in
    }
  });
}, {});

fadeUpElements.forEach((el) => {
  fadeUpObserver.observe(el);
});
