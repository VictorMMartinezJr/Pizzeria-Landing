"use strict";

const iconBurger = document.querySelector(".burger");
const iconBurgerLines = document.querySelectorAll(".burger-line");
const iconBlob = document.querySelector(".blob");
const navLinks = document.querySelector(".nav-links");

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
