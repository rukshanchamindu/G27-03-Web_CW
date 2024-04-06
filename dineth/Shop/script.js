document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".H-cart-btn");
    const cartTab = document.querySelector(".cart-tab");
    const closeBtn = document.querySelector(".close");
    const addToCartBtns = document.querySelectorAll(".r-btn ");
    const listCart = document.querySelector(".list-cart");
    const totalPriceDisplay = document.querySelector(".totalprice");
    let totalPrice = 0;

    function updateTotalPrice() {
        totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        if (totalPrice > 0) {
            isCartEmpty = false; 
        } else {
            isCartEmpty = true; 
        }
    }

    function addToCart(itemName, itemImage, itemPrice) {
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
            <div class="image">
                <img src="${itemImage}" alt="${itemName}">
            </div>
            <div class="name">${itemName}</div>
            <div class="price">${itemPrice.toFixed(2)}</div>
            <div class="quantity">
                <span class="minus"> < </span>
                <span>1</span>
                <span class="plus"> > </span>
            </div>
            <div class="delete">
                <i class="ri-delete-bin-line"></i>
            </div>
        `;

        const plusBtn = item.querySelector(".plus");
        const minusBtn = item.querySelector(".minus");
        const quantityDisplay = item.querySelector(".quantity span:nth-child(2)");
        const deleteBtn = item.querySelector(".delete i");

        plusBtn.addEventListener("click", function() {
            const quantity = parseInt(quantityDisplay.textContent);
            quantityDisplay.textContent = quantity + 1;
            totalPrice += itemPrice;
            updateTotalPrice();
        });

        minusBtn.addEventListener("click", function() {
            const quantity = parseInt(quantityDisplay.textContent);
            if (quantity > 1) {
                quantityDisplay.textContent = quantity - 1;
                totalPrice -= itemPrice;
                updateTotalPrice();
            }
        });

        deleteBtn.addEventListener("click", function() {
            item.remove();
            totalPrice -= itemPrice * parseInt(quantityDisplay.textContent);
            updateTotalPrice();
        });

        listCart.appendChild(item);
        totalPrice += itemPrice;
        updateTotalPrice();
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            const itemContainer = event.target.closest(".row");
            const itemName = itemContainer.querySelector("h3").textContent;
            const itemImage = itemContainer.querySelector(".row-img img").src;
            const itemPrice = parseFloat(itemContainer.querySelector("h5").textContent.substring(1)); 
            addToCart(itemName, itemImage, itemPrice);
        });
    });

    cartIcon.addEventListener("click", function() {
        cartTab.classList.toggle("show-cart");
    });

    closeBtn.addEventListener("click", function() {
        cartTab.classList.remove("show-cart");
    });

    const shopNowBtn = document.getElementById('shop-now-btn');
    const productsSection = document.getElementById('products');

    shopNowBtn.addEventListener('click', function(event) {
        event.preventDefault();
        productsSection.scrollIntoView({ behavior: 'smooth' });
    });
});
