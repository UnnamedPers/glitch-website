const cartButtons = document.querySelectorAll('.cart-button');
const cartPopup = document.querySelector('.cart-popup');
const cartOverlay = document.querySelector('.cart-overlay');
let totalText = document.querySelector('.total-text');


let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


cartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        if (cartPopup) cartPopup.classList.toggle('active');
        if (cartOverlay) cartOverlay.classList.toggle('active');
    });
});

document.addEventListener('click', (event) => {
    // Check if the click was inside the cart popup
    const isClickInsidePopup = cartPopup.contains(event.target);
    
    // Check if the click was on any of the cart buttons
    let isClickOnButton = false;
    cartButtons.forEach(button => {
        if (button.contains(event.target)) {
            isClickOnButton = true;
        }
    });

    // If the click was outside both the popup and the buttons, and the popup is active, close it
    if (cartPopup && !isClickInsidePopup && !isClickOnButton && cartPopup.classList.contains('active')) {
        cartPopup.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    }
});

// Use event delegation for Add to Cart buttons since they are spawned dynamically
document.addEventListener('click', (event) => {
    const addToCartButton = event.target.closest('.add-to-cart-button');
    if (addToCartButton) {
        event.preventDefault();
        let found = false;
        // 1. Loop through the cart
        for (let i = 0; i < cart.length; i++) {
            if (addToCartButton.id === cart[i][0]) {
                console.log("the same id spotted");
                cart[i][1] = cart[i][1] + 1;
                found = true;
                break;
            }
        }
        // 2. If the item was NOT found (whether the cart was empty or not), add it
        if (!found) {
            cart.push([addToCartButton.id, 1]);
        }
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Refresh the UI display
        if (typeof updateCart === 'function') {
            updateCart();
        }
    }
});

fetch("json/products.json")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        updateCart();
    });

function updateCart() {
    const cartLists = document.querySelectorAll('.cart-list');
    if (cartLists.length === 0) return;
    
    cartLists.forEach(list => list.innerHTML = '');
    
    if (typeof allProducts === 'undefined' || allProducts.length === 0) return;

    let allprices = [];
    cart.forEach(item => {
        const cartItemContent = `
            <img src="${allProducts[item[0]].image}" alt="${allProducts[item[0]].name}">
            <div class="cart-item-info">
                <h2>${allProducts[item[0]].name}</h2>
                <div class="cart-item-price">
                    <p class="text-black">${allProducts[item[0]].price}</p>
                    <div class="cart-item-quantity">
                        <p class="text-black">Quantity: ${item[1]}</p>
                        <div id="${item[0]}" class="add-quantity-button quantity-button glitch-button btn-transparent">
                            <p class="text-black">+</p>
                        </div>
                        <div id="${item[0]}" class="remove-quantity-button quantity-button glitch-button btn-transparent">
                            <p class="text-black">-</p>
                        </div>
                    </div>
                </div>
            </div>`;
        allprices.push(allProducts[item[0]].price * item[1]);
        
        cartLists.forEach(list => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = cartItemContent;
            list.appendChild(cartItem);
        });
    });
    if (totalText) totalText.textContent = `Total: $${allprices.reduce((a, b) => a + b, 0).toFixed(2)}`;
};


document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-quantity-button');
    const removeButton = event.target.closest('.remove-quantity-button');
    
    if (addButton || removeButton) {
        event.preventDefault();
        const button = addButton || removeButton;
        const productId = button.id;
        
        // Find index of the item in cart
        const itemIndex = cart.findIndex(item => item[0] === productId);
        
        
        if (addButton) {
            cart[itemIndex][1]++;
        } else if (removeButton) {
            cart[itemIndex][1]--;
            // If quantity drops to 0 or less, remove it from cart
            if (cart[itemIndex][1] <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
            
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
});

const emptyCartButton = document.querySelector('.empty-cart-button');
emptyCartButton.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
});