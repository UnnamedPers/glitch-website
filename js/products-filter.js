// Product spawning

const productsContainer = document.querySelector("#products-container");
const sortLinks = document.querySelectorAll(".sort-links p");
const catLinks = document.querySelectorAll(".cat-links p");
const minPrice = document.querySelector("#min-price");
const maxPrice = document.querySelector("#max-price");
const applyButton = document.querySelector("#apply-button");

let allProducts = [];
let activeSort = "popularity";
let activeCategory = "all";
let minPriceValue = 0;
let maxPriceValue = Infinity;

fetch("json/products.json")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        spawnProducts(allProducts);
    });


function spawnProducts(data) {
    productsContainer.innerHTML = ""; // Clear existing products
    for (let i = 0; i < data.length; i++) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${data[i].image}" alt="${data[i].name}">
            </div>
            <div class="product-info">
                <div class="product-info-top">
                    <h2 class="text-black">${data[i].name}</h2>
                    <p class="text-black">${data[i].category}</p>
                </div>
                <div class="product-info-bottom">
                <p class="text-black">$${(data[i].price).toFixed(2)}</p>
                    <div id="${data[i].id}" class="add-to-cart-button glitch-button btn-black-bg">
                        <p class="text-white">ADD TO CART</p>
                    </div>
                </div>
            </div>
        `;
        productCard.addEventListener("click", (event) => {
            // Check if we clicked the "Add to Cart" button or its children
            if (!event.target.closest('.add-to-cart-button')) {
                localStorage.setItem("product-page", data[i].id);
                window.location.href = "product-page.html";
            }
        });

        productsContainer.appendChild(productCard);
    }
    // Re-initialize glitch buttons to include newly spawned ones
    if (typeof initAllGlitchButtons === 'function') {
        initAllGlitchButtons();
    }
}

// Sort Links

sortLinks.forEach(link => {
    link.addEventListener("click", () => {
        sortLinks.forEach(link => link.classList.remove("active"));
        activeSort = link.textContent.toLowerCase().slice(2);
        link.classList.add("active");
    });
});

// Category Links

catLinks.forEach(link => {
    link.addEventListener("click", () => {
        catLinks.forEach(link => link.classList.remove("active"));
        activeCategory = link.textContent.toLowerCase().slice(2);
        link.classList.add("active");
    });
});

// Price Filter

minPrice.addEventListener("focus", () => {
    minPrice.style.border = "4px solid var(--primary)";
});

maxPrice.addEventListener("focus", () => {
    maxPrice.style.border = "4px solid var(--primary)";
});

// Apply Button

applyButton.addEventListener("click", () => {
    if (minPrice.value === "") {
        minPriceValue = 0;
    } else {
        minPriceValue = minPrice.value;
    }
    if (maxPrice.value ===  "") {
        maxPriceValue = 1000000;
    } else {
        maxPriceValue = maxPrice.value;
    }
    if (minPriceValue > maxPriceValue) { // Check if the min price is greater than the max price
        alert("Invalid price range");
        minPrice.style.border = "4px solid #EF170D";
        maxPrice.style.border = "4px solid #EF170D";
        return;
    }

    minPrice.style.border = "4px solid var(--primary)";
    maxPrice.style.border = "4px solid var(--primary)";

    sessionStorage.setItem("sort by", activeSort);
    sessionStorage.setItem("category", activeCategory);
    sessionStorage.setItem("min-price", minPriceValue);
    sessionStorage.setItem("max-price", maxPriceValue);

    // Perform filtering
    let filteredProducts = allProducts.filter(product => {
        const matchedCategory = activeCategory === "all" || product.category.toLowerCase() === activeCategory;
        const matchedPrice = product.price >= minPriceValue && product.price <= maxPriceValue;
        return matchedCategory && matchedPrice;
    });

    // Perform sorting
    if (activeSort === "lowest price") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (activeSort === "highest price") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (activeSort === "recent") {
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    spawnProducts(filteredProducts);
});