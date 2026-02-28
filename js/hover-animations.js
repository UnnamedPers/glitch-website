function initGlitchButton(button, colorMode) {
    if (!button) return;
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

    for (let i = 0; i < numSkews; i++) {
        const skew = document.createElement('div');
        skew.classList.add('hover-skew');
        button.appendChild(skew);
        
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
initGlitchButton(document.querySelector('.cart-button'), "black");
initGlitchButton(document.querySelector('.mode-button'), "black");
initGlitchButton(document.querySelector('.explore-new'), "pink");
initGlitchButton(document.querySelector('.explore-button'), "white");
initGlitchButton(document.querySelector('.checkout-button'), "white");
initGlitchButton(document.querySelector('.empty-cart-button'), "black");
