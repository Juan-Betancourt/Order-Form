/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var myCart = [];
// var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

    //TODO: Add an <option> tag inside the form's select for each product
    var selectElement = document.getElementById('items');
    for (var i in Product.allProducts) {
        var el = document.createElement('option');
        el.textContent = Product.allProducts[i].name;
        selectElement.appendChild(el);
    }

    var viewCurrentCart = document.getElementById('cartContents');
    var addedToCartEl = document.createElement('addedToCartEl');
    addedToCartEl.textContent = 'Current items in your cart:'
    viewCurrentCart.appendChild(addedToCartEl);

}
// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
// TODO: Prevent the page from reloading

function handleSubmit(event) { // TODO: Prevent the page from reloading 
    if (document.getElementById('quantity').value) {
        event.preventDefault();
        addSelectedItemToCart();
        cart.saveToLocalStorage();
        document.getElementById('cartContents').innerHTML = '';
        var viewCurrentCart = document.getElementById('cartContents');
        var addedToCartEl = document.createElement('addedToCartEl');
        addedToCartEl.textContent = 'Current items in your cart:'
        viewCurrentCart.appendChild(addedToCartEl);
        updateCounter();
        updateCartPreview();
    } else {
        event.preventDefault();
        alert('Please selet the number of products to purchase.');
        updateCounter();
    }
}


// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
    // TODO: suss out the item picked from the select list
    var listItemOfUser = document.getElementById('items').value;
    // TODO: get the quantity
    var totalQuantity = document.getElementById('quantity').value
        // TODO: using those, add one item to the Cart
    new CartItem(listItemOfUser, totalQuantity);
}

function saveToLocalStorage() {
    // TODO: Fill in this instance method to save the contents of the cart to localStorage
    var totalCart = JSON.stringify(myCart);
    localStorage.setItem('CartSummary', totalCart)
};

// saving it back to myCart
if (localStorage.CartSummary) {
    var getCartSummary = localStorage.getItem('CartSummary')
    myCart = JSON.parse(getCartSummary);
}
// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
    var cartUpdateCount = document.getElementById('itemCount');
    cartUpdateCount.textContent = 'Your cart has: ' + (myCart.length) + ' Products.';
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
    var viewCurrentCart = document.getElementById('cartContents');
    var ulEl = document.createElement('ul');
    for (var i = 0; i < myCart.length; i++) {
        var liEl = document.createElement('li');

        liEl.textContent = 'Product: ' + myCart[i].product + ' & quantity: ' + myCart[i].quantity;
        ulEl.appendChild(liEl);
    }
    viewCurrentCart.appendChild(ulEl);
    // TODO: Get the item and quantity from the form
    // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCartPreview();