'use strict';

var customerArray = [];
var washingItems = ['T-Shirts', 'Pants', 'Shorts', 'Formal Wear', 'Socks and Underwear', 'Jackets', 'Others'];
var priceArray = [1, 1.5, 0.75, 2, 0.5, 1.5, 1];
var placeOrder = document.getElementById("place-order");
placeOrder.style.display = "none";
var combinedTotal = 0;
var quanititiesArray = new Array(7).fill(0);




function CustomerOrder(name, phone, address, choices, checkedValue, promo, total) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.choices = choices;
    this.promo = promo;
    this.quantity = checkedValue;
    this.total = total;

    customerArray.push(this);
    calculateTotalSales(this.total);
    calculateTotalQuantities(this.quantity);


}

// create local storage to store data 
function customerData() {
    localStorage.setItem('customers', JSON.stringify(customerArray));
    localStorage.setItem("Quantity-ordered", JSON.stringify(quanititiesArray));
    localStorage.setItem("Total-Sales", JSON.stringify(combinedTotal));

}

function calculateTotalSales(total) {
    combinedTotal += total;
}

function calculateTotalQuantities(quantity) {
    for (let index = 0; index < quantity.length; index++) {
        var sum = 0;
        sum += quantity[index];
        quanititiesArray[index] += sum;
    }


}

// back up the data from localstorage to object array 
function retrieveData() {

    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === "customers") {
                customerArray = JSON.parse(localStorage.getItem("customers"));
            }
            else if (localStorage.key(i) === "Quantity-ordered") {
                quanititiesArray = JSON.parse(localStorage.getItem("Quantity-ordered"));
            }
            else if (localStorage.key(i) === "Total-Sales") {
                combinedTotal = JSON.parse(localStorage.getItem("Total-Sales"));
            }
        }
    }

}

var formOrder = document.getElementById("order-from");
formOrder.addEventListener('submit', addNewCustomer);
var choices = [];
var quantity = [];


function addNewCustomer(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var phone = event.target.contact.value;
    var address = event.target.address.value;
    var numberinput = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < washingItems.length; i++) {
        if (numberinput[i].value === "") {
            choices.push(washingItems[i]);
            quantity.push(0);

        }
        else {
            choices.push(washingItems[i]);
            quantity.push(parseInt(numberinput[i].value));
        }
    }

    var promo = event.target.promo.value;

    var promoValue = 0;
    var promoName = "";

    switch (promo) {
        case "ST30":
            promoValue = 0.3;
            promoName = "ST30";
            break;
        case "TA15":
            promoValue = 0.15;
            promoName = "TA15";
            break;
        case "AD10":
            promoValue = 0.1;
            promoName = "AD10";
            break;
        default:
            promoValue = 1;
            promoName = "None";
            break;
    }

    var totalPrice = renderReciept(promoValue);



    // student 30%  ST30  
    // Ta 15% TA15
    // Admin 10% AD10

    var customer = new CustomerOrder(name, phone, address, choices, quantity, promoName, totalPrice);


}

function renderReciept(promoValue) {
    placeOrder.style.display = "block";

    var totalPrice = 0;

    var parent = document.getElementById("reciept");
    var table = document.createElement("table");
    table.setAttribute("border", "1");
    parent.appendChild(table);
    var headRow = document.createElement("tr");
    table.appendChild(headRow);
    var headColumnOne = document.createElement("th");
    headColumnOne.textContent = "Item";
    headRow.appendChild(headColumnOne);
    var headColumnTwo = document.createElement("th");
    headColumnTwo.textContent = "Amount";
    headRow.appendChild(headColumnTwo);
    var headColumnThree = document.createElement("th");
    headColumnThree.textContent = "Price";
    headRow.appendChild(headColumnThree);
    var headColumnFour = document.createElement("th");
    headColumnFour.textContent = "Item Total";
    headRow.appendChild(headColumnFour);


    for (var j = 0; j < washingItems.length; j++) {
        if (quantity[j] !== 0) {
            var bodyRow = document.createElement("tr");
            table.appendChild(bodyRow);

            var bodyColumnOne = document.createElement("td");
            bodyColumnOne.textContent = choices[j];
            bodyRow.appendChild(bodyColumnOne);

            var bodyColumnTwo = document.createElement("td");
            bodyColumnTwo.textContent = quantity[j];
            bodyRow.appendChild(bodyColumnTwo);

            var bodyColumnThree = document.createElement("td");
            bodyColumnThree.textContent = priceArray[j];
            bodyRow.appendChild(bodyColumnThree);

            var bodyColumnFour = document.createElement("td");
            bodyColumnFour.textContent = quantity[j] * priceArray[j];
            bodyRow.appendChild(bodyColumnFour);


            totalPrice = totalPrice + quantity[j] * priceArray[j];
        }

    }

    if (promoValue === 1) {
        var footerRowOne = document.createElement("tr");
        table.appendChild(footerRowOne);
        var footerColumnOne = document.createElement("th");
        footerColumnOne.setAttribute("colspan", "4");
        footerColumnOne.textContent = "Total : " + totalPrice + " JD";
        footerRowOne.appendChild(footerColumnOne);
    } else {
        var footerRowOne = document.createElement("tr");
        table.appendChild(footerRowOne);
        var footerColumnOne = document.createElement("th");
        footerColumnOne.setAttribute("colspan", "4");
        footerColumnOne.textContent = "Total : " + totalPrice + " JD";
        footerRowOne.appendChild(footerColumnOne);

        var footerRowTwo = document.createElement("tr");
        table.appendChild(footerRowTwo);

        var footerColumnTwo = document.createElement("th");
        footerColumnTwo.setAttribute("colspan", "4");
        footerColumnTwo.textContent = "Total After Discount : " + parseFloat(totalPrice - (totalPrice * promoValue)).toFixed(2) + " JD";
        footerRowTwo.appendChild(footerColumnTwo);

        var footerRowThree = document.createElement("tr");
        table.appendChild(footerRowThree);

        var footerColumnThree = document.createElement("th");
        footerColumnThree.setAttribute("colspan", "4");
        footerColumnThree.textContent = "Please make sure to have your Uni ID on you at time of Payment";
        footerRowThree.appendChild(footerColumnThree);
    }


    return totalPrice;
}

placeOrder.addEventListener('click', function (event) {
    customerData();
    alert("Order Submitted");
    location.reload();

});

retrieveData();






