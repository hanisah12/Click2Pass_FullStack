document.addEventListener('DOMContentLoaded', () => {
    // Shared Hamburger Menu Toggle logic for all pages
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Standard footer update if needed
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2025')) {
        // Already standard, but we could dynamic it: 
        // footerYear.innerHTML = `© ${new Date().getFullYear()} Click2Pass. All rights reserved.`;
    }
});
