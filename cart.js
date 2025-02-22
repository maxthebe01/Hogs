document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let total = 0;

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        total = 0;

        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>R${item.price}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>R${subtotal}</td>
                <td><button onclick="removeItem(${index})">❌</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.innerText = total;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.updateQuantity = function (index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    updateCartDisplay();
});
