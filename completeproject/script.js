document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('authSection');
    const mainContent = document.getElementById('mainContent');
    const orders = [];

    const toggleLink = document.getElementById('toggleLink');
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        const authTitle = document.getElementById('authTitle');
        const isSignUp = authTitle.textContent === 'Sign Up';

        if (isSignUp) {
            authTitle.textContent = 'Login';
            toggleLink.textContent = "Don't have an account? Sign Up";
            document.getElementById('confirmPassword').classList.add('hidden');
        } else {
            authTitle.textContent = 'Sign Up';
            toggleLink.textContent = "Already have an account? Login";
            document.getElementById('confirmPassword').classList.remove('hidden');
        }
        document.getElementById('authEmail').value = '';
        document.getElementById('authPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    document.getElementById('authForm').addEventListener('submit', (e) => {
        e.preventDefault();
        authSection.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Toggle sections
    document.getElementById('homeLink').addEventListener('click', () => {
        document.getElementById('homeSection').style.display = 'block';
        document.getElementById('orderSection').style.display = 'none';
        document.getElementById('trackSection').style.display = 'none';
    });

    document.getElementById('orderLink').addEventListener('click', () => {
        document.getElementById('homeSection').style.display = 'none';
        document.getElementById('orderSection').style.display = 'block';
        document.getElementById('trackSection').style.display = 'none';
    });

    document.getElementById('trackLink').addEventListener('click', () => {
        document.getElementById('homeSection').style.display = 'none';
        document.getElementById('orderSection').style.display = 'none';
        document.getElementById('trackSection').style.display = 'block';
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';

        orders.forEach((order, index) => {
            orderList.innerHTML += `
                <div class="order-box">
                    <p><strong>Order #${index + 1}</strong></p>
                    <p>Name: ${order.name}</p>
                    <p>Location: ${order.location}</p>
                    <p>Clothes Count: ${order.clothesCount}</p>
                    <p>Order Date: ${order.date}</p>
                    <p>Due Date: ${order.dueDate}</p>
                    <button class="btn" onclick="editOrder(${index})">Edit</button>
                    <button class="btn" onclick="deleteOrder(${index})">Delete</button>
                </div>
            `;
        });
    });

    document.getElementById('logoutLink').addEventListener('click', () => {
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
        document.getElementById('authForm').reset();
    });

    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('orderName').value.trim();
        const location = document.getElementById('orderLocation').value.trim();
        const clothesCount = document.getElementById('clothesCount').value;
        const date = document.getElementById('orderDate').value;

        // Calculate due date (2 days after the order date)
        const dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 2);

        // Add order to the orders array
        orders.push({ name, location, clothesCount, date, dueDate: dueDate.toLocaleDateString() });

        // Show confirmation
        document.getElementById('orderConfirmation').style.display = 'block';
        document.getElementById('orderForm').reset();
    });

    // Show shop details
    document.getElementById('showShopDetails').addEventListener('click', () => {
        const shopInfo = document.getElementById('shopInfo');
        shopInfo.classList.toggle('hidden');
    });
});

// Edit Order
function editOrder(index) {
    const order = orders[index];
    document.getElementById('orderName').value = order.name;
    document.getElementById('orderLocation').value = order.location;
    document.getElementById('clothesCount').value = order.clothesCount;
    document.getElementById('orderDate').value = order.date;

    // Remove the order from the array and update the order list
    orders.splice(index, 1);
    document.getElementById('trackLink').click(); // Refresh order list
}

// Delete Order
function deleteOrder(index) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
        orders.splice(index, 1);
        alert("Order deleted successfully.");
        document.getElementById('trackLink').click(); // Refresh order list
    }
}
