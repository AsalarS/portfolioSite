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
  window.addEventListener("scroll", function() {
    var navBar = document.getElementById("navBar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navBar.classList.add("shown");
    } else {
      navBar.classList.remove("shown");
    }

    // Check if footer is visible and update sidebar visibility
    checkFooterVisibility();
  });

  // Create and append floating sidebar
  createFloatingSidebar();

  // Add dark mode toggle to navbar
  addDarkModeToggle();

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Initial check for footer visibility
  checkFooterVisibility();

  // Set up Intersection Observer for footer
  setupFooterObserver();
});

// Setup Intersection Observer to detect when footer is visible
function setupFooterObserver() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sidebar = document.querySelector(".floating-sidebar");
          if (!sidebar) return;

          if (entry.isIntersecting) {
            // Footer is visible
            sidebar.classList.add("hidden");
          } else {
            // Footer is not visible
            sidebar.classList.remove("hidden");
          }
        });
      },
      { threshold: 0.1 }
  );

  observer.observe(footer);
}


// Alternative method using getBoundingClientRect
function checkFooterVisibility() {
  const footer = document.getElementById("footer");
  const sidebar = document.querySelector(".floating-sidebar");

  if (footer && sidebar) {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // If footer is visible in the viewport (even partially)
    if (footerRect.top < windowHeight && footerRect.bottom >= 0) {
      sidebar.classList.add("hidden");
    } else {
      sidebar.classList.remove("hidden");
    }
  }
}

function createFloatingSidebar() {
  const floatingSidebar = document.createElement("div");
  floatingSidebar.classList.add("floating-sidebar");
  floatingSidebar.id = "floatingSidebar";

  // Base styles for the sidebar
  floatingSidebar.style.display = "flex";
  floatingSidebar.style.gap = "15px";
  floatingSidebar.style.transition = "visibility 0.3s, opacity 0.3s";

  const sidebarIcons = [
    { src: "./assets/linkedin.png", link: "https://www.linkedin.com/in/alinalfardan/" },
    { src: "./assets/github.png", link: "https://github.com/AsalarS" },
    { src: "./assets/icon_email.png", link: "mailto:ali.n.alfardan@gmail.com" },
    { src: "./assets/icon_cv.png", link: "./assets/Ali Alfardan CV.pdf" }
  ];

  sidebarIcons.forEach(icon => {
    const iconEl = document.createElement("img");
    iconEl.src = icon.src;
    iconEl.classList.add("sidebar-icon");
    iconEl.onclick = () => window.open(icon.link);
    floatingSidebar.appendChild(iconEl);
  });

  document.body.appendChild(floatingSidebar);

  // Set initial layout based on screen size
  updateSidebarLayout();
  window.addEventListener("resize", updateSidebarLayout);

  // Check footer visibility
  window.addEventListener("resize", checkFooterVisibility);
}

function updateSidebarLayout() {
  const floatingSidebar = document.querySelector(".floating-sidebar");
  if (floatingSidebar) {
    if (window.innerWidth <= 768) {
      // Mobile layout - horizontal
      floatingSidebar.style.flexDirection = "row";
      floatingSidebar.classList.add("floating-sidebar-mobile");
      floatingSidebar.classList.remove("floating-sidebar-desktop");
    } else {
      // Desktop layout - vertical
      floatingSidebar.style.flexDirection = "column";
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