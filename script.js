let selectedPrice = 0;
let quantity = 1;

// Function to open modal with product details
function openModal(title, description, image, price) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = image;
    selectedPrice = price;
    quantity = 1; // Reset quantity when opening modal
    updatePrice();
    document.getElementById('product-modal').style.display = 'flex';
}

// Function to update total price based on quantity
function updatePrice() {
    document.getElementById('quantity').textContent = quantity;
    document.getElementById('modal-price').textContent = `R${(selectedPrice * quantity).toFixed(2)}`;
}

// Function to change quantity
function changeQuantity(value) {
    quantity += value;
    if (quantity < 1) quantity = 1; // Ensure minimum of 1
    updatePrice();
}

// Function to close modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}
