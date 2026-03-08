const productName = document.querySelector(".info-section .name");
const productCategory = document.querySelector(".info-section .category");
const productPrice = document.querySelector(".info-section .price");
const productDescription = document.querySelector(".info-section .description");
const productImage = document.querySelector(".image-section img");
const addToCartButton = document.querySelector(".add-to-cart-button");

const productId = localStorage.getItem("product-page");

if (productId !== null) {
    fetch("json/products.json")
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.id == productId);
            if (product) {
                productName.textContent = product.name;
                productCategory.textContent = product.category;
                productPrice.textContent = `$${product.price.toFixed(2)}`;
                productDescription.textContent = product.description;
                productImage.src = product.image;
                productImage.alt = product.name;
                addToCartButton.id = product.id;
            }
        });
} else {
    window.location.href = "products.html";
}