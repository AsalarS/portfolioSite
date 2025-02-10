window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const navBar = document.body.querySelector("#navBar");
  if (navBar) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#navBar",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// When the user scrolls down 50px from the top of the document, show the nav bar
window.onscroll = function () {
  var navBar = document.getElementById("navBar");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navBar.classList.add("shown");
  } else {
    navBar.classList.remove("shown");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = "🌓";
  darkModeToggle.classList.add("dark-mode-toggle");
  darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    `;
  document.body.appendChild(darkModeToggle);

  // Floating Sidebar
  const floatingSidebar = document.createElement("div");
  floatingSidebar.classList.add("floating-sidebar");

  const updateSidebarPosition = () => {
    if (window.innerWidth <= 768) {
      // Mobile view - bottom positioning
      floatingSidebar.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 40px;
                padding: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 1000;
                width: auto;
                max-width: 90%;
            `;
    } else {
      // Desktop view - side positioning
      floatingSidebar.style.cssText = `
                position: fixed;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 20px;
                padding: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 1000;
            `;
    }
  };

  const sidebarIcons = [
    {
      src: "./assets/linkedin.png",
      link: "https://www.linkedin.com/in/alinalfardan/",
    },
    { src: "./assets/github.png", link: "https://github.com/AsalarS" },
    { src: "./assets/email.png", link: "mailto:ali.n.alfardan@gmail.com" },
    { src: "./assets/linkedin.png", link: "./assets/Ali Alfardan CV.pdf" },
  ];

  sidebarIcons.forEach((icon) => {
    const iconEl = document.createElement("img");
    iconEl.src = icon.src;
    iconEl.style.cssText = `
            width: 30px;
            height: 30px;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
    iconEl.addEventListener("mouseover", () => {
      iconEl.style.transform = "scale(1.2)";
    });
    iconEl.addEventListener("mouseout", () => {
      iconEl.style.transform = "scale(1)";
    });
    iconEl.onclick = () => window.open(icon.link);
    floatingSidebar.appendChild(iconEl);
  });

  document.body.appendChild(floatingSidebar);

  // Initial positioning
  updateSidebarPosition();

  // Reposition on window resize
  window.addEventListener("resize", updateSidebarPosition);

  // Dark Mode Logic
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});
