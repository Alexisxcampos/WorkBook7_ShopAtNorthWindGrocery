let mainDropdownSelect = document.getElementById("mainDropdown");
let categoryDropdownOptions = document.getElementById("secondaryDropdown");
let producksList = document.getElementById("producks");
mainDropdownSelect.addEventListener("change", () => {
    if (mainDropdownSelect.value === "category") {
        fetch("http://localhost:8081/api/categories")
            .then((res) => res.json())
            .then((allCategories) => {
                for (let category of allCategories) {
                    console.log(category);
                    console.log("----");
                    var optionElement = document.createElement("option");
                    optionElement.textContent = category.name;
                    optionElement.value = category.categoryId;
                    categoryDropdownOptions.appendChild(optionElement);
                }
            })
    }
    if (mainDropdownSelect.value === "viewAll") {
        fetch("http://localhost:8081/api/products")
        .then((res) => res.json())
        .then((allProducts) => {
            producksList.innerHTML = ' ';
            for (let product of allProducts) {
                console.log(product);
                producksList.innerHTML += `${product.productName} <a href="${product.productId}">${product.productName}</a><br>`; 
            }
        });
    }
});

categoryDropdownOptions.addEventListener("change", () =>{
    let selectedCategory = categoryDropdownOptions.value;
    fetch("http://localhost:8081/api/products")
    .then((res) => res.json())
    .then((allProducts) => {
        let products = allProducts.filter(val => val.categoryId == selectedCategory);
        producksList.innerHTML = ' ';
        for (let product of products) {
            console.log(product);
            producksList.innerHTML += `${product.productName} <br>`; 
        }
    });
});
// ${Number(product.unitPrice).toFixed(2)} ${product.supplier} ${product.unitsInStock == 0 ? ' OUT OF STOCK!!!!!!!!!!!' : 'In stock'}