// select inputs from DOM
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let searchTitle = document.querySelector("#searchTitle");
let searchCategory = document.querySelector("#searchCategory");
let searchInput = document.getElementById("search");


let temp;
let mood = "create";

price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
searchTitle.addEventListener("click", function () {
    getSearchMood(this.id);
});
searchCategory.addEventListener("click", function () {
    getSearchMood(this.id);
})

searchInput.addEventListener("keyup", function () {
    searchData(this.value);
})

//GET TOTAL
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

//CREATE PRODUCT
let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);
    showData();
} else {
    products = [];
}

submit.onclick = function () {
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != "" && price.value != "" && category.value != "" && product.count <= 100) {
        //COUNT
        if (mood === "create") {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    products.push(product);
                }
            } else {
                products.push(product);
            }
        } else {
            products[temp] = product;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }

    //SAVE LOCALSTORAGE
    localStorage.setItem("product", JSON.stringify(products));
    showData();
}

//CLEAR INPUTS
function clearData() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//READ
function showData() {
    getTotal();
    let table = ``;
    for (let i = 0; i < products.length; i++) {
        table += `
<tr>
<td>${i + 1}</td>
<td>${products[i].title}</td>
<td>${products[i].price}</td>
<td>${products[i].taxes}</td>
<td>${products[i].ads}</td>
<td>${products[i].discount}</td>
<td>${products[i].total}</td>
<td>${products[i].category}</td>
<td><button id="update" onclick="updataData(${i})">Update</button></td>
<td><button id="delete" onclick="(deleteData(${i}))">Delete</button></td>
</tr> `

    }
    document.querySelector("#tBody").innerHTML = table;
    let deleteBtn = document.querySelector("#deleteAll");
    if (products.length > 0) {
        deleteBtn.innerHTML = `
          <button onclick = "deleteAll()">Delete All (${products.length})</button>`
    } else {
        deleteBtn.innerHTML = ``;
    }
}

//DELETE
function deleteData(i) {
    products.splice(i, 1);
    localStorage.product = JSON.stringify(products);
    showData();
}

//DELETE ALL
function deleteAll() {
    localStorage.clear();
    products.splice(0);
    showData();
}

//UPDATE
function updataData(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    category.value = products[i].category;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//SEARCH
let searchMood = "title";
function getSearchMood(id) {

    if (id === "searchTitle") {
        searchMood = "title";
    } else if (id === "searchCategory") {
        searchMood = "category";
    }
    searchInput.placeholder = "Search By " + searchMood;
    search.focus();
    searchInput.value = "";
    showData();
}

function searchData(value) {
    let table = ``;
    for (let i = 0; i < products.length; i++) {

        if (searchMood == "title") {
            if (products[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button id="update" onclick="updataData(${i})">Update</button></td>
                <td><button id="delete" onclick="(deleteData(${i}))">Delete</button></td>
                </tr> `

            }
        } else {

            if (products[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button id="update" onclick="updataData(${i})">Update</button></td>
                <td><button id="delete" onclick="(deleteData(${i}))">Delete</button></td>
                </tr> `
            }
        }
    }

    document.querySelector("#tBody").innerHTML = table;
}


