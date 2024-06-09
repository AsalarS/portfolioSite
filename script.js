window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const navBar = document.body.querySelector('#navBar');
    if (navBar) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navBar',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// When the user scrolls down 50px from the top of the document, show the nav bar
window.onscroll = function() {
    var navBar = document.getElementById("navBar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navBar.classList.add("shown");
    } else {
        navBar.classList.remove("shown");
    }
};