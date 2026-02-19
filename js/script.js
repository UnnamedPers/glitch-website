const saletexts = [];
const container = document.querySelector(".sale-animation");
let mover = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomFromRange(min, max) {
    return Math.random() * (max - min) + min;
}

function textSpawning() {
    container.innerHTML = ""; // Clear previous text elements;
    for (let i = 0; i < 15; i++) {
        const el = document.createElement("h2");
        el.textContent = "SALE!";
        el.classList.add("text-white");

        // Randomize size, speed, and position
        const size = randomFromRange(24, 100);
        const speed = randomFromRange(3, 5);
        const x = randomFromRange(-500, container.offsetWidth);
        const y = randomFromRange(0, container.offsetHeight - size);
        const opacity = randomFromRange(0.5, 1);

        // Initial Styles
        el.style.fontSize = size + "px";
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.opacity = opacity;

        container.appendChild(el);

        // Multi-dimensional array: [element, currentX, currentY, size, speed]
        saletexts.push([el, x, y, size, speed, opacity]);
    }
}

async function runLoop() {
    textSpawning(); // Initialize the texts

    while (true) {
        const containerWidth = container.offsetWidth;
        for (let i = 0; i < saletexts.length; i++) {
            let el = saletexts[i][0];
            let x = saletexts[i][1];
            let speed = saletexts[i][4];

            // Update position
            x += speed;

            // Reset to left if it goes off the right side
            if (x > containerWidth) {
                x = -el.offsetWidth;
                saletexts[i][2] = randomFromRange(0, container.offsetHeight - saletexts[i][3]);
                saletexts[i][4] = randomFromRange(2, 6);
                el.style.top = saletexts[i][2] + "px";
            }

            // Apply style and save new X
            el.style.left = x + "px";
            saletexts[i][1] = x;
        }
        await sleep(20);
    }
}

runLoop();