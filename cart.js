const userId = 1;  // Temporary user ID, use authentication in production

// Function to add an item to cart
function addToCart(productName, price, quantity) {
    fetch("//https://thebe01md.pythonanywhere.com/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_name: productName, price: price, quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.href = "cart.html";
        } else {
            alert("Error adding to cart");
        }
    });
}

// Function to load cart items
function loadCart() {
    fetch(`//https://thebe01md.pythonanywhere.com/cart?user_id=${userId}`)
    .then(response => response.json())
    .then(cartItems => {
        let cartTable = document.getElementById("cart-items");
        let cartTotal = document.getElementById("cart-total");
        cartTable.innerHTML = "";
        let total = 0;

        cartItems.forEach(item => {
            let subtotal = item.price * item.quantity;
            total += subtotal;

            let row = `<tr>
                <td>${item.product_name}</td>
                <td>R${item.price}</td>
                <td>${item.quantity}</td>
                <td>R${subtotal}</td>
                <td><button onclick="removeFromCart(${item.id})">❌</button></td>
            </tr>`;
            cartTable.innerHTML += row;
        });

        cartTotal.innerText = total;
    });
}

// Function to remove an item from the cart
function removeFromCart(cartId) {
    fetch("//https://thebe01md.pythonanywhere.com//delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            loadCart();
        } else {
            alert("Error removing item");
        }
    });
}

// Load cart when page loads
document.addEventListener("DOMContentLoaded", loadCart);
