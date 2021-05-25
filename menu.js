const menuContainer = document.querySelector(".header--menu");
const container = document.querySelector(".menu-container");

menuContainer.addEventListener("click", () => {
  container.classList.toggle("menu-container-visible");
});
