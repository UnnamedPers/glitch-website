const cartButton = document.querySelector('.cart-button');
const cartPopup = document.querySelector('.cart-popup');
const cartOverlay = document.querySelector('.cart-overlay');

let cartOpened = false;

cartButton.addEventListener('click', (event) => {
    event.preventDefault();
    cartPopup.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    cartOpened = cartPopup.classList.contains('active');
});

// Optional: Close popup when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsidePopup = cartPopup.contains(event.target);
    const isClickOnButton = cartButton.contains(event.target);

    if (!isClickInsidePopup && !isClickOnButton && cartOpened) {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
        cartOpened = false;
    }
});
