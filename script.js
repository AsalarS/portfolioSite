// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavbarBehavior();
  initFloatingSidebar();
  initDarkMode();
  initSmoothScroll();

  // Initialize scroll animations for elements
  initScrollAnimations();
});

// Initialize navbar behaviors
function initNavbarBehavior() {
  // Activate Bootstrap scrollspy with offset
  const body = document.body;
  if (typeof bootstrap !== 'undefined') {
    try {
      new bootstrap.ScrollSpy(body, {
        target: "#navBar",
        rootMargin: "0px 0px -40%",
        offset: 100
      });
    } catch (e) {
      console.warn("Bootstrap ScrollSpy not available", e);
    }
  }

  // Update active links manually if Bootstrap ScrollSpy not available
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    // Navbar appearance on scroll
    const navBar = document.getElementById("navBar");
    if (window.scrollY > 50) {
      navBar.classList.add("shown");
    } else {
      navBar.classList.remove("shown");
    }

    // Update active links if Bootstrap ScrollSpy not available
    if (typeof bootstrap === 'undefined') {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = "#" + section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === current) {
          link.classList.add("active");
        }
      });
    }
  });

  // Add click event to nav links for smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
}

// Create and initialize floating sidebar
function initFloatingSidebar() {
  const floatingSidebar = document.createElement("div");
  floatingSidebar.classList.add("floating-sidebar");
  floatingSidebar.id = "floatingSidebar";

  // Social links for the sidebar
  const sidebarIcons = [
    { icon: "fab fa-linkedin fa-fw", link: "https://www.linkedin.com/in/alinalfardan/", alt: "LinkedIn" },
    { icon: "fab fa-github fa-fw", link: "https://github.com/AsalarS", alt: "GitHub" },
    { icon: "fas fa-envelope fa-fw", link: "mailto:ali.n.alfardan@gmail.com", alt: "Email" },
    { icon: "fas fa-file-alt fa-fw", link: "./assets/Ali Alfardan CV.pdf", alt: "CV" }
  ];

  // Create icons and add to sidebar
  sidebarIcons.forEach(item => {
    const iconEl = document.createElement("i");
    iconEl.className = `${item.icon} sidebar-icon`;
    iconEl.title = item.alt;
    iconEl.setAttribute("aria-label", item.alt);
    iconEl.onclick = () => window.open(item.link);
    floatingSidebar.appendChild(iconEl);
  });

  document.body.appendChild(floatingSidebar);

  // Set initial layout based on screen size
  updateSidebarLayout();

  // Add event listeners for window resize
  window.addEventListener("resize", () => {
    updateSidebarLayout();
  });
}

// Update sidebar layout based on screen size
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

// Initialize dark mode functionality
function initDarkMode() {
  // Add dark mode toggle to navbar
  const navLinksContainer = document.querySelector(".nav-links");
  if (!navLinksContainer) return;

  const darkModeToggle = document.createElement("li");
  darkModeToggle.innerHTML = `<button class="dark-mode-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>`;
  navLinksContainer.appendChild(darkModeToggle);

  // Add click event for dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    const darkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", darkMode);

    // Update icon based on mode
    const icon = darkModeToggle.querySelector("i");
    if (darkMode) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    const icon = darkModeToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }
}

// Initialize scroll animations for elements
function initScrollAnimations() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    // Animate job cards
    animateElements('.job-card', 'job-card-hidden', 'job-card-visible');

    // Animate project cards
    animateElements('.project-card', 'project-card-hidden', 'project-card-visible');

    // Animate section titles
    animateElements('.title', 'title-hidden', 'title-visible');
  }
}

// Helper function to animate elements with Intersection Observer
function animateElements(selector, hiddenClass, visibleClass) {
  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(element => {
    element.classList.add(hiddenClass);
    observer.observe(element);
  });
}

// Initialize smooth scrolling behavior
function initSmoothScroll() {
  // Apply smooth scrolling to all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}