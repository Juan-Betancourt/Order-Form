'use strict';

var myCart = [];
// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.

function loadCart() {
    var getCartSummary = localStorage.getItem('CartSummary')
    myCart = JSON.parse(getCartSummary);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
    loadCart();
    clearCart();
    showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}
document.getElementsByTagName("tbody").innerHTML = ''; // clearing all the tbody
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
    // TODO: Find the table body
    for (var i = 0; i < myCart.length; i++) {
        var tableBody = document.getElementsByTagName("tbody")[0];
        var trEl = document.createElement('tr');

        trEl.setAttribute('onclick', 'removeFunc(this)'); // setting onclick and run removeFunc

        var tdEl = document.createElement('td');
        tdEl.textContent = 'X';
        trEl.appendChild(tdEl);

        var tdEl = document.createElement('td');
        tdEl.textContent = myCart[i].quantity;
        trEl.appendChild(tdEl);

        var tdEl = document.createElement('td');
        tdEl.textContent = myCart[i].product;
        trEl.appendChild(tdEl);

        var imgEl = document.createElement('img');
        if (myCart[i].product.toLowerCase() === 'usb') {
            imgEl.setAttribute('src', 'assets/' + myCart[i].product.toLowerCase() + '.gif');
        } else if (myCart[i].product.toLowerCase() === 'sweep') {
            imgEl.setAttribute('src', 'assets/' + myCart[i].product.toLowerCase() + '.png');
        } else {
            imgEl.setAttribute('src', 'assets/' + myCart[i].product.toLowerCase() + '.jpg');
        };
        imgEl.setAttribute('alt', 'na');
        imgEl.setAttribute('height', '50px');
        imgEl.setAttribute('width', '50px');
        trEl.appendChild(imgEl);

        tableBody.appendChild(trEl);
    }
    // TODO: Iterate over the items in the cart
    // TODO: Create a TR
    // TODO: Create a TD for the delete link, quantity,  and the item
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeFunc(x) {
    console.log(x);
    var getCartStr = localStorage.getItem('CartSummary')
    myCart = JSON.parse(getCartStr);
    myCart.splice(x.rowIndex - 1, 1); // splicing 
    document.getElementsByTagName("tbody")[0].deleteRow(x.rowIndex - 1); //deleting row
    //adding back to LocalStorage
    var updateCart = JSON.stringify(myCart);
    localStorage.setItem('CartSummary', updateCart)
}
// This will initialize the page and draw the cart on screen
renderCart();