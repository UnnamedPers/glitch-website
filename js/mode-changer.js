const modeButton = document.querySelectorAll(".mode-button");
const navLogo = document.querySelectorAll(".nav-logo");
const footerLogo = document.querySelectorAll(".footer-logo");

function applyTheme(mode) {
    if (mode === "1") {
        document.documentElement.style.setProperty('--background', '#1e1e1e');
        document.documentElement.style.setProperty('--primary', '#e9e9e9');
        document.documentElement.style.setProperty('--transparent', '#1e1e1e99');
        document.documentElement.style.setProperty('--filter-black', 'invert(100%) sepia(0%) saturate(1301%) hue-rotate(5deg) brightness(115%) contrast(83%)');
        document.documentElement.style.setProperty('--filter-white', 'invert(10%) sepia(58%) saturate(0%) hue-rotate(240deg) brightness(89%) contrast(96%)');
        
        navLogo.forEach(el => {
            el.innerHTML = `
            <img src="images/logo/logo-white.png" alt="">
        `;
        })
        footerLogo.forEach(el => {
            el.src="images/logo/logo-black.png";
        })


    } else {
        document.documentElement.style.setProperty('--background', '#e9e9e9');
        document.documentElement.style.setProperty('--primary', '#1e1e1e');
        document.documentElement.style.setProperty('--transparent', '#e9e9e999');
        document.documentElement.style.setProperty('--filter-black', 'invert(10%) sepia(58%) saturate(0%) hue-rotate(240deg) brightness(89%) contrast(96%)');
        document.documentElement.style.setProperty('--filter-white', 'invert(100%) sepia(0%) saturate(1301%) hue-rotate(5deg) brightness(115%) contrast(83%)');

        navLogo.forEach(el => {
            el.innerHTML = `
            <img src="images/logo/logo-black.png" alt="">
        `;
        })
        footerLogo.forEach(el => {
            el.src="images/logo/logo-white.png";
        })


    }
}

// Initialize theme from localStorage
const currentMode = localStorage.getItem('mode') || "0";
applyTheme(currentMode);

modeButton.forEach(button => {
    button.addEventListener('click', () => {
        const mode = localStorage.getItem('mode') === "0" ? "1" : "0";
        localStorage.setItem('mode', mode);
        applyTheme(mode);
    });
});