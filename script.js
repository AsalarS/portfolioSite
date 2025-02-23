// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Activate Bootstrap scrollspy
  const navBar = document.body.querySelector("#navBar");
  if (navBar) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#navBar",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Navbar scroll behavior
  window.onscroll = function() {
    var navBar = document.getElementById("navBar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navBar.classList.add("shown");
    } else {
      navBar.classList.remove("shown");
    }
  };

  // Create and append floating sidebar
  createFloatingSidebar();

  // Add dark mode toggle to navbar
  addDarkModeToggle();

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

function createFloatingSidebar() {
  const floatingSidebar = document.createElement("div");
  floatingSidebar.classList.add("floating-sidebar");

  const sidebarIcons = [
    { src: "./assets/linkedin.png", link: "https://www.linkedin.com/in/alinalfardan/" },
    { src: "./assets/github.png", link: "https://github.com/AsalarS" },
    { src: "./assets/email.png", link: "mailto:ali.n.alfardan@gmail.com" },
    { src: "./assets/linkedin.png", link: "./assets/Ali Alfardan CV.pdf" }
  ];

  sidebarIcons.forEach(icon => {
    const iconEl = document.createElement("img");
    iconEl.src = icon.src;
    iconEl.classList.add("sidebar-icon");
    iconEl.onclick = () => window.open(icon.link);
    floatingSidebar.appendChild(iconEl);
  });

  document.body.appendChild(floatingSidebar);

  // Handle responsive layout
  updateSidebarLayout();
  window.addEventListener("resize", updateSidebarLayout);
}

function updateSidebarLayout() {
  const floatingSidebar = document.querySelector(".floating-sidebar");
  if (floatingSidebar) {
    if (window.innerWidth <= 768) {
      floatingSidebar.classList.add("floating-sidebar-mobile");
      floatingSidebar.classList.remove("floating-sidebar-desktop");
    } else {
      floatingSidebar.classList.add("floating-sidebar-desktop");
      floatingSidebar.classList.remove("floating-sidebar-mobile");
    }
  }
}

function addDarkModeToggle() {
  const navLinksContainer = document.querySelector(".nav-links");
  const darkModeToggle = document.createElement("li");
  darkModeToggle.innerHTML = `<button class="dark-mode-toggle">🌓</button>`;
  navLinksContainer.appendChild(darkModeToggle);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
}