'use strict';

var washingItems = ['T-Shirts', 'Pants', 'Shorts', 'Formal Wear', 'Socks and Underwear', 'Jackets', 'Others'];
var customerArray = [];
var combinedTotal=0;
var quanititiesArray=new Array(7).fill(0);
var chart = document.getElementById("bar-chart").getContext('2d');
var statistics = document.getElementById("show-statistics");
var showTable = document.getElementById('show-table');
showTable.style.display = "none";
var ownersTable = document.getElementById('owner-table');

var formPassword = document.getElementById('password');
var errorMessage = document.getElementById("error_message");


function retrieveData(){

    if (localStorage.length>0){
        for(var i = 0; i< localStorage.length; i++){
            if(localStorage.key(i)==="customers" ){
                customerArray= JSON.parse(localStorage.getItem("customers"));
            }
            else if(localStorage.key(i)==="Quantity-ordered" ){
                quanititiesArray= JSON.parse(localStorage.getItem("Quantity-ordered"));
            }
            else if(localStorage.key(i)==="Total-Sales"){
                combinedTotal= JSON.parse(localStorage.getItem("Total-Sales"));
            }
        }
    }     

}
function renderBarChart() {
     new Chart(chart, {
      type: 'horizontalBar',
      data: {
        labels: washingItems,
        datasets: [
          {
            label: '# of Items Washed',
            data: quanititiesArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 92, 122, 0.2)',
  
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
             
            ],
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5
            }
          }]
        }
      }
    });
  }

statistics.addEventListener("submit", function(event){
    event.preventDefault();
    retrieveData();

    renderBarChart();
});

function renderTable(){
// ownersTable.setAttribute("border","1");
var tableHeader = document.createElement("tr");
ownersTable.appendChild(tableHeader);

var tableName = document.createElement("th");
tableName.textContent = "Name";
tableHeader.appendChild(tableName);

var tableContactNumber = document.createElement("th");
tableContactNumber.textContent = "Contact Number";
tableHeader.appendChild(tableContactNumber);

var tableAddress = document.createElement("th");
tableAddress.textContent = "Address";
tableHeader.appendChild(tableAddress);

for(var i = 0; i <washingItems.length;i ++){
    var tableItems = document.createElement("th");
    tableItems.textContent = washingItems[i];
    tableHeader.appendChild(tableItems);
}

var tablePromo = document.createElement("th");
tablePromo.textContent = "Promo Code";
tableHeader.appendChild(tablePromo);

var tableTotal = document.createElement("th");
tableTotal.textContent = "Total";
tableHeader.appendChild(tableTotal);


for(var j = 0 ;j <customerArray.length; j++){
    
    var tableBody = document.createElement("tr");
    ownersTable.appendChild(tableBody);
    
    // for(var k = 0 ;k < 12; k++){
    
        var tableBodyName = document.createElement("td");
        tableBodyName.textContent = customerArray[j].name;
        tableBody.appendChild(tableBodyName);

        var tableBodyPhone = document.createElement("td");
        tableBodyPhone.textContent = customerArray[j].phone;
        tableBody.appendChild(tableBodyPhone);

        var tableBodyAddress = document.createElement("td");
        tableBodyAddress.textContent = customerArray[j].address;
        tableBody.appendChild(tableBodyAddress);

        for(var x = 0; x< customerArray[j].quantity.length;x++){
            var tableBodyQuantity = document.createElement("td");
            tableBodyQuantity.textContent = customerArray[j].quantity[x];
            tableBody.appendChild(tableBodyQuantity);
        }

        var tableBodyPromo = document.createElement("td");
        tableBodyPromo.textContent = customerArray[j].promo;
        tableBody.appendChild(tableBodyPromo);

        var tableBodyTotal = document.createElement("td");
        tableBodyTotal.textContent = customerArray[j].total;
        tableBody.appendChild(tableBodyTotal);

    // }

}
}
showTable.addEventListener('submit', function(event){
    event.preventDefault();
    ownersTable.innerHTML="";
    retrieveData();
    renderTable();
});

formPassword.addEventListener("submit",function(event){
  event.preventDefault();
  var password = event.target.password.value;
  var checkPassword = "admin123";

  if(password === checkPassword){
    showTable.style.display = "block";
    formPassword.style.display = "none";
    errorMessage.style.display = "none";
  }
  else{
    errorMessage.innerHTML="Your Password is Wrong Please ReCheck your Input";
  }

});