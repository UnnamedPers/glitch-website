const cartButtons = document.querySelectorAll('.cart-button');
const cartPopup = document.querySelector('.cart-popup');
const cartOverlay = document.querySelector('.cart-overlay');

cartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        cartPopup.classList.toggle('active');
        cartOverlay.classList.toggle('active');
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
    if (!isClickInsidePopup && !isClickOnButton && cartPopup.classList.contains('active')) {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
});
