'use strict';

let time = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm']

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let shops = []

function Shops(location, min, max, avg,) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avg = avg;
    this.customers = [];
    this.cookies = [];
    this.totalsum = 0

    shops.push(this);
}

Shops.prototype.getNumberOfCustomers = function () {
    for (let i = 0; i < time.length; i++) {
        let num = randomNumber(this.min, this.max)
        this.customers.push(Math.round(num))
    }
}

Shops.prototype.getNumberOfCookies = function () {
    for (let i = 0; i < time.length; i++) {
        this.cookies.push(Math.round(this.customers[i] * this.avg))
        this.totalsum += this.cookies[i]
    }
}

let parent = document.getElementById('Container');
let table = document.createElement('table');
parent.appendChild(table);

function renderHeader() {
    let headingRow = document.createElement('tr');
    table.appendChild(headingRow);
    let thElement = document.createElement('th');
    headingRow.appendChild(thElement);
    thElement.textContent = '';

    for (let i = 0; i < time.length; i++) {
        // creating th
        let thElement = document.createElement('th');
        // append to the row
        headingRow.appendChild(thElement);
        // give text content
        thElement.textContent = time[i];
    }

    let thElementTotal = document.createElement('th');
    headingRow.appendChild(thElementTotal);
    thElementTotal.textContent = 'Daily Location Total';
}


Shops.prototype.renderBody = function () {
    let bodyRow = document.createElement('tr');
    table.appendChild(bodyRow);
    let thElement = document.createElement('td')
    bodyRow.appendChild(thElement);
    thElement.textContent = this.location
    for (let j = 0; j < time.length; j++) {
        // creating th
        let thElement = document.createElement('td');
        // append to the row
        bodyRow.appendChild(thElement);
        // give text content
        thElement.textContent = this.cookies[j];
    }
    let thElementTotalsum = document.createElement('td')
    bodyRow.appendChild(thElementTotalsum);
    thElementTotalsum.textContent = this.totalsum
}

let seattle = new Shops('Seattle', 23, 65, 6.3)
let tokyo = new Shops('Tokyo', 3, 24, 1.4)
let dubai = new Shops('Dubai', 11, 38, 3.7)
let paris = new Shops('Paris', 20, 38, 2.3)
let lima = new Shops('Lima', 2, 16, 4.6)

let shopsForm = document.getElementById('shopsForm');
shopsForm.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();

    let location = event.target.location.value
    let min = event.target.min.value
    let max = event.target.max.value
    let avg = event.target.avg.value
    
    min = parseInt(min)
    max = parseInt(max)
    avg = parseInt(avg)
    
    let container = document.getElementById('Container');
    let table2 = table
    container.textContent = '';
    table.textContent = '';
    
    let addedShop = new Shops(location, min, max, avg)
    console.log(container)
    container.appendChild(table)

    renderHeader()

    for (let i = 0; i < shops.length; i++) {
        shops[i].getNumberOfCustomers()
        shops[i].getNumberOfCookies()
        shops[i].renderBody()
    }
    renderFooter()
    
}
renderHeader()
for (let i = 0; i < shops.length; i++) {
    shops[i].getNumberOfCustomers()
    shops[i].getNumberOfCookies()
    shops[i].renderBody()
}

function renderFooter() {
    let footerRow = document.createElement('tr');
    table.appendChild(footerRow);
    let thElement = document.createElement('th');
    footerRow.appendChild(thElement);
    thElement.textContent = 'Totals';

    let hourlytotalsum = []
    for (let i = 0; i < time.length; i++) {
        let sum = 0
        for (let j = 0; j < shops.length; j++) {
            sum += shops[j].cookies[i]
        }
        hourlytotalsum[i] = sum
    }


    let totalsum = 0
    for (let i = 0; i < hourlytotalsum.length; i++) {
        totalsum += hourlytotalsum[i];
    }

    for (let i = 0; i < hourlytotalsum.length; i++) {
        // creating th
        let thElement = document.createElement('th');
        // append to the row
        footerRow.appendChild(thElement);
        // give text content
        thElement.textContent = hourlytotalsum[i];
    }

    let thElementTotal = document.createElement('th');
    footerRow.appendChild(thElementTotal);
    thElementTotal.textContent = totalsum;
}
renderFooter()





// let seattle = {
//     location: 'Seattle',
//     min: 23,
//     max: 65,
//     avg: 6.3,
//     customers: [],
//     cookie: [],

//     getcustomers: function() {
//         for (let i = 0; i < time.length; i++) {
//             this.customers[i] = randomNumber(this.max,this.min);
//         }
//     }
// }
// seattle.getcustomers()
// for (let i = 0; i < time.length; i++) {
//     let cookie = seattle.customers[i]*seattle.avg
//     seattle.cookie[i]= cookie.toFixed()
// }

// let parent = document.getElementById('seattle');

// let articleElement = document.createElement('article')
// parent.appendChild(articleElement);

// let h2ElementSeattle = document.createElement('h2')
// articleElement.appendChild(h2ElementSeattle)
// h2ElementSeattle.textContent = seattle.location

// let ulElementSeattle = document.createElement('ul')

// articleElement.appendChild(ulElementSeattle)

// for (let i = 0; i < time.length; i++) {

//     let liElementSeattle = document.createElement('li')

//     ulElementSeattle.appendChild(liElementSeattle)

//     liElementSeattle.textContent = time[i] + ": " +  seattle.cookie[i] + ' Cookies'
// }

// for (let i = 0; i < seattle.cookie.length; i++) {
//     seattle.cookie[i] = parseFloat(seattle.cookie[i]);

// }

// let Totalsum = seattle.cookie.reduce(function(a, b){
//     return a + b;
// }, 1);
// let liElementSeattle = document.createElement('li')
// ulElementSeattle.appendChild(liElementSeattle)
// liElementSeattle.textContent = 'Total: ' + Totalsum + ' Cookies'

// let tokyo = {
//     location: 'Tokyo',
//     min: 3,
//     max: 24,
//     avg: 1.2,
//     customers: [],
//     cookie: [],

//     getcustomers: function() {
//         for (let i = 0; i < time.length; i++) {
//             this.customers[i] = randomNumber(this.max,this.min);
//         }
//     }
// }

// tokyo.getcustomers()
// for (let i = 0; i < time.length; i++) {
//     let cookie = tokyo.customers[i]*tokyo.avg
//     tokyo.cookie[i]= cookie.toFixed()
// }


// let h2ElementTokyo = document.createElement('h2')
// articleElement.appendChild(h2ElementTokyo)
// h2ElementTokyo.textContent = tokyo.location

// let ulElementTokyo = document.createElement('ul')

// articleElement.appendChild(ulElementTokyo)

// for (let i = 0; i < time.length; i++) {

//     let liElementTokyo = document.createElement('li')

//     ulElementTokyo.appendChild(liElementTokyo)

//     liElementTokyo.textContent = time[i] + ": " +  tokyo.cookie[i] + ' Cookies'
// }

// for (let i = 0; i < tokyo.cookie.length; i++) {
//     tokyo.cookie[i] = parseFloat(tokyo.cookie[i]);

// }

// let Totalsum2 = tokyo.cookie.reduce(function(a, b){
//     return a + b;
// }, 1);
// let liElementTokyo = document.createElement('li')
// ulElementTokyo.appendChild(liElementTokyo)
// liElementTokyo.textContent = 'Total: ' + Totalsum2 + ' Cookies'

// let dubai = {
//     location: 'Dubai',
//     min: 11,
//     max: 38,
//     avg: 3.7,
//     customers: [],
//     cookie: [],

//     getcustomers: function() {
//         for (let i = 0; i < time.length; i++) {
//             this.customers[i] = randomNumber(this.max,this.min);
//         }
//     }
// }

// dubai.getcustomers()
// for (let i = 0; i < time.length; i++) {
//     let cookie = dubai.customers[i]*dubai.avg
//     dubai.cookie[i]= cookie.toFixed()
// }


// let h2ElementDubai = document.createElement('h2')
// articleElement.appendChild(h2ElementDubai)
// h2ElementDubai.textContent = dubai.location

// let ulElementDubai = document.createElement('ul')

// articleElement.appendChild(ulElementDubai)

// for (let i = 0; i < time.length; i++) {

//     let liElementDubai = document.createElement('li')

//     ulElementDubai.appendChild(liElementDubai)

//     liElementDubai.textContent = time[i] + ": " +  dubai.cookie[i] + ' Cookies'
// }
// for (let i = 0; i < dubai.cookie.length; i++) {
//     dubai.cookie[i] = parseFloat(dubai.cookie[i]);

// }

// let Totalsum3 = dubai.cookie.reduce(function(a, b){
//     return a + b;
// }, 1);
// let liElementDubai = document.createElement('li')
// ulElementDubai.appendChild(liElementDubai)
// liElementDubai.textContent = 'Total: ' + Totalsum3 + ' Cookies'


// let paris = {
//     location: 'Paris',
//     min: 20,
//     max: 38,
//     avg: 2.3,
//     customers: [],
//     cookie: [],

//     getcustomers: function() {
//         for (let i = 0; i < time.length; i++) {
//             this.customers[i] = randomNumber(this.max,this.min);
//         }
//     }
// }

// paris.getcustomers()
// for (let i = 0; i < time.length; i++) {
//     let cookie = paris.customers[i]*paris.avg
//     paris.cookie[i]= cookie.toFixed()
// }


// let h2ElementParis = document.createElement('h2')
// articleElement.appendChild(h2ElementParis)
// h2ElementParis.textContent = paris.location

// let ulElementParis = document.createElement('ul')

// articleElement.appendChild(ulElementParis)

// for (let i = 0; i < time.length; i++) {

//     let liElementParis = document.createElement('li')

//     ulElementParis.appendChild(liElementParis)

//     liElementParis.textContent = time[i] + ": " +  paris.cookie[i] + ' Cookies'
// }

// for (let i = 0; i < paris.cookie.length; i++) {
//     paris.cookie[i] = parseFloat(paris.cookie[i]);

// }

// let Totalsum4 = paris.cookie.reduce(function(a, b){
//     return a + b;
// }, 1);
// let liElementParis = document.createElement('li')
// ulElementParis.appendChild(liElementParis)
// liElementParis.textContent = 'Total: ' + Totalsum4 + ' Cookies'


// let lima = {
//     location: 'Lima',
//     min: 2,
//     max: 16,
//     avg: 4.6,
//     customers: [],
//     cookie: [],

//     getcustomers: function() {
//         for (let i = 0; i < time.length; i++) {
//             this.customers[i] = randomNumber(this.max,this.min);
//         }
//     }
// }
// lima.getcustomers()
// for (let i = 0; i < time.length; i++) {
//     let cookie = lima.customers[i]*lima.avg
//     lima.cookie[i]= cookie.toFixed()
// }

// let h2ElementLima = document.createElement('h2')
// articleElement.appendChild(h2ElementLima)
// h2ElementLima.textContent = lima.location

// let ulElementLima = document.createElement('ul')

// articleElement.appendChild(ulElementLima)

// for (let i = 0; i < time.length; i++) {

//     let liElementLima = document.createElement('li')

//     ulElementLima.appendChild(liElementLima)

//     liElementLima.textContent = time[i] + ": " +  lima.cookie[i] + ' Cookies'
// }

// for (let i = 0; i < lima.cookie.length; i++) {
//     lima.cookie[i] = parseFloat(lima.cookie[i]);

// }

// let Totalsum5 = lima.cookie.reduce(function(a, b){
//     return a + b;
// }, 1);
// let liElementLima = document.createElement('li')
// ulElementLima.appendChild(liElementLima)
// liElementLima.textContent = 'Total: ' + Totalsum5 + ' Cookies'










