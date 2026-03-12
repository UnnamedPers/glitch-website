function initGlitchButton(button, colorMode) {
    if (!button || button.classList.contains('glitch-initialized')) return;
    button.classList.add('glitch-initialized');

    // 1. Hover Listeners
    button.addEventListener("mouseover", () => {
        if (colorMode === "black") {
            button.style.backgroundColor = "var(--primary)";
            button.style.color = "var(--background)";
            const img = button.querySelector("img");
            if (img) img.style.filter = "brightness(0) invert(1)";
            const p = button.querySelector("p");
            if (p) p.style.color = "var(--background)";
        } else if (colorMode === "pink") {
            button.style.backgroundColor = "var(--pink)";
            button.style.color = "var(--background)";
            const img = button.querySelector("img");
            if (img) img.style.filter = "brightness(0) invert(1)";
            const p = button.querySelector("p");
            if (p) p.style.color = "var(--background)";
        } else if (colorMode === "white") {
            button.style.backgroundColor = "var(--background)";
            button.style.color = "var(--primary)";
            const img = button.querySelector("img");
            if (img) img.style.filter = "brightness(0) invert(1)";
            const p = button.querySelector("p");
            if (p) p.style.color = "var(--primary)";
        }
    });

    button.addEventListener("mouseout", () => {
        if (colorMode === "black") {
            button.style.backgroundColor = "";
            button.style.color = "";
            const img = button.querySelector("img");
            if (img) img.style.filter = "";
            const p = button.querySelector("p");
            if (p) p.style.color = "";
        } else if (colorMode === "pink") {
            button.style.backgroundColor = "";
            button.style.color = "";
            const img = button.querySelector("img");
            if (img) img.style.filter = "";
            const p = button.querySelector("p");
            if (p) p.style.color = "";
        } else if (colorMode === "white") {
            button.style.backgroundColor = "";
            button.style.color = "";
            const img = button.querySelector("img");
            if (img) img.style.filter = "";
            const p = button.querySelector("p");
            if (p) p.style.color = "";
        }
    });

    // 2. Spawn Skews
    const spacing = 35;
    const buttonWidth = button.offsetWidth || 100; // Fallback if width not yet calculated
    const numSkews = Math.ceil(buttonWidth / spacing) + 1;
    const skews = [];

    // Find or create hover-animation container
    let hoverContainer = button.querySelector('.hover-animation');
    if (!hoverContainer) {
        hoverContainer = document.createElement('div');
        hoverContainer.classList.add('hover-animation');
        button.appendChild(hoverContainer);
    }


    for (let i = 0; i < numSkews; i++) {
        const skew = document.createElement('div');
        skew.classList.add('hover-skew');
        hoverContainer.appendChild(skew);
        
        if (colorMode === "black") {
            skew.style.backgroundColor = "#ffffff2c";
        } else if (colorMode === "pink") {
            skew.style.backgroundColor = "#b300ad53";
        } else if (colorMode === "white") {
            skew.style.backgroundColor = "#6e6e6e2c";
        }

        const startX = i * spacing;
        skew.style.left = startX + "px";
        skews.push({ element: skew, x: startX });
    }

    // 3. Independent Animation Loop
    const totalWidth = skews.length * spacing;

    function animate() {
        for (let i = 0; i < skews.length; i++) {
            skews[i].x += 1.5;
            
            if (skews[i].x > buttonWidth) {
                skews[i].x -= totalWidth;
            }
            skews[i].element.style.left = skews[i].x + "px";
        }
        requestAnimationFrame(animate);
    }
    
    if (skews.length > 0) {
        animate();
    }
}

// Initialize all desired buttons
function initAllGlitchButtons() {
    document.querySelectorAll('.glitch-button').forEach(b => {
        let mode = "black";
        
        if (b.id === 'explore-button') {
            mode = "white";
        } else if (b.classList.contains('btn-black-bg')) {
            mode = "white";
        } else if (b.classList.contains('btn-pink-bg')) {
            mode = "pink";
        } else if (b.classList.contains('btn-white-outline')) {
            mode = "white";
        } else if (b.classList.contains('btn-transparent')) {
            mode = "black";
        } else if (b.classList.contains('btn-primary')) {
            mode = "white";
        }
        
        initGlitchButton(b, mode);
    });
}

// Initialize all desired buttons on load
window.addEventListener('load', initAllGlitchButtons);
// Also run immediately in case some things are already there
initAllGlitchButtons();
