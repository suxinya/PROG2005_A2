"use strict";
// Initialize the inventory array and hardcode test data
let inventory = [
    {
        itemId: 'E001',
        itemName: 'Laptop',
        category: 'Electronics',
        quantity: 10,
        price: 999.99,
        supplierName: 'Tech Supplier Inc.',
        stockStatus: 'In Stock',
        isPopular: 'Yes',
        comment: '2024 latest model'
    },
    {
        itemId: 'F001',
        itemName: 'Office Chair',
        category: 'Furniture',
        quantity: 3,
        price: 199.99,
        supplierName: 'Furniture World',
        stockStatus: 'Low Stock',
        isPopular: 'No'
    }
];
// Get DOM elements
const feedback = document.getElementById('feedback');
const itemIdInput = document.getElementById('itemId');
const itemNameInput = document.getElementById('itemName');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const supplierInput = document.getElementById('supplier');
const stockStatusInput = document.getElementById('stockStatus');
const isPopularInput = document.getElementById('isPopular');
const commentInput = document.getElementById('comment');
const addBtn = document.getElementById('addBtn');
const inventoryList = document.getElementById('inventoryList');
// Utility function 1: Display feedback information
function showFeedback(message, isSuccess) {
    feedback.textContent = message;
    feedback.className = 'feedback ' + (isSuccess ? 'success' : 'error');
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}
// Utility function 2: Verify whether the Item ID is unique
function isItemIdUnique(id) {
    return !inventory.some(item => item.itemId === id);
}
// Tool function 3: Basic data verification
function validateInput(data) {
    // Check whether the required fields are empty
    if (!data.itemId || !data.itemName || !data.category || !data.quantity || !data.price || !data.supplierName || !data.stockStatus || !data.isPopular) {
        showFeedback('All fields marked with "*" are required and cannot be empty!', false);
        return false;
    }
    // Check whether the numerical field is a positive number
    if (data.quantity < 0 || data.price < 0) {
        showFeedback('The quantity and price must be non-negative!', false);
        return false;
    }
    // Check whether the ID is unique
    if (!isItemIdUnique(data.itemId)) {
        showFeedback('The item ID already exists and must be unique!', false);
        return false;
    }
    return true;
}
//Page initialization+event binding
function initPage() {
    renderInventoryList();
}
// Render inventory list to the page
function renderInventoryList() {
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <h3>${item.itemName} (ID: ${item.itemId})</h3>
            <p>Category: ${item.category}</p>
            <p>Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}</p>
            <p>Supplier: ${item.supplierName}</p>
            <p>Stock Status: ${item.stockStatus} | Popular: ${item.isPopular}</p>
            ${item.comment ? `<p>Comment: ${item.comment}</p>` : ''}
        `;
        inventoryList.appendChild(itemDiv);
    });
}
// Page initialization
initPage();
