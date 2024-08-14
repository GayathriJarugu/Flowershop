// Initialize an empty cart and total price variable
const cart = [];
let totalPrice = 0;

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        // Find the closest .flower-item element
        const flowerItem = event.target.closest('.flower-item');
        // Get the name and price from the flower item
        const name = flowerItem.getAttribute('data-name');
        const price = parseInt(flowerItem.getAttribute('data-price'));

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += price;
        } else {
            // Add the flower item to the cart array with a quantity of 1
            cart.push({ name, price, quantity: 1, totalPrice: price });
        }
        
        // Update the total price
        totalPrice += price;

        // Update the cart UI
        updateCartUI();
    });
});

// Function to update the Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear the cart items list
    cartItems.innerHTML = '';

    // Iterate over the cart array to display each item
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity} = $${item.totalPrice}
            <button class="increase-qty" data-index="${index}">+</button>
            <button class="decrease-qty" data-index="${index}">-</button>
        `;
        cartItems.appendChild(li);
    });

    // Update the total price in the UI
    totalPriceElement.textContent = totalPrice;

    // Add event listeners to the increase and decrease buttons
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            increaseQuantity(index);
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            decreaseQuantity(index);
        });
    });
}

// Function to increase the quantity of a cart item
function increaseQuantity(index) {
    const item = cart[index];
    item.quantity += 1;
    item.totalPrice += item.price;
    totalPrice += item.price;
    updateCartUI();
}

// Function to decrease the quantity of a cart item
function decreaseQuantity(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice -= item.price;
        totalPrice -= item.price;
    } else {
        // Remove the item from the cart if quantity is 1
        totalPrice -= item.price;
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Show the checkout section when the "Checkout" button is clicked
document.getElementById('checkout').addEventListener('click', () => {
    document.getElementById('checkout-section').style.display = 'block';
});

// Handle the form submission for checkout
document.getElementById('checkout-form').addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const customerEmail = document.getElementById('customer-email').value;
    const customerName = document.getElementById('customer-name').value;

    // Generate a receipt string using the customer's name and the cart items
    const receipt = `Hello ${customerName},\n\nThank you for your purchase at FlwrShp. Here is your order summary:\n\n` +
                    cart.map(item => `${item.name} - $${item.price} x ${item.quantity} = $${item.totalPrice}`).join('\n') +
                    `\n\nTotal: $${totalPrice}\n\nWe hope you enjoy your flowers!\n\nBest regards,\nFlwrShp`;

    // Simulate sending emails by showing an alert (in a real app, this would be done server-side)
    alert(`Receipt sent to ${customerEmail}`);
    alert(`Order details sent to FlwrShp at info@flwrshp.com`);

    // Clear the cart and reset the UI after the purchase
    cart.length = 0; // Empty the cart array
    totalPrice = 0; // Reset the total price
    updateCartUI(); // Update the UI
    document.getElementById('checkout-section').style.display = 'none'; // Hide the checkout section
});
