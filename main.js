var nextProductId = 0;
var nameSet = new Set();

function handleAddProduct(){
    let productBar = document.querySelector("input.add-product-bar");
    let name = productBar.value.trim();
    addProduct(name);
    productBar.value = "";
    productBar.focus();
}

function addProduct(name){
    if (isEmpty(name))
        window.alert("Product name can not be empty!");
    else{
        if (nameSet.has(name))
            window.alert("Product with same name already exists!");
        else{
            nameSet.add(name);
            let productList = document.querySelector(".product-list-section");
            productList.appendChild(createProductSection(name, nextProductId));
            let remainingStatistics = document.body.querySelector(".remaining-statistics .statistic-items");
            remainingStatistics.appendChild(createStatisticItemSection(name, `S${nextProductId}`));
            nextProductId++;
        }
    }
}

function deleteProduct(id) {
    let name = document.getElementById(id).querySelector("input.product-name").value;
    nameSet.delete(name);
    document.getElementById(id).remove();
    document.getElementById(`S${id}`).remove();
}

function setProductAsBought(id) {
    let productSection = document.getElementById(id);
    let name = productSection.querySelector("input.product-name").value;
    let amount = productSection.querySelector("span.product-amount").innerText;
    productSection.classList.add("bought-item");
    productSection.innerHTML = "";
    productSection.appendChild(createBoughtProductNameElement(name));
    productSection.appendChild(createBoughtProductAmountSection(amount));
    productSection.appendChild(createBoughtProductButtonsSection(id));
}

function setProductAsNotBought(id) {
    let productSection = document.getElementById(id);
    let name = productSection.querySelector("span.product-name").innerText;
    let amount = productSection.querySelector("span.product-amount").innerText;
    productSection.classList.remove("bought-item");
    productSection.innerHTML = "";
    productSection.appendChild(createProductNameElement(name, id));
    productSection.appendChild(createProductAmountSection(amount, id));
    productSection.appendChild(createProductButtonsSection(id));
}

function createProductSection(name, id) {
    let productSection = document.createElement("section");
    productSection.id = id;
    productSection.classList.add("product-section")
    productSection.appendChild(createProductNameElement(name, id));
    productSection.appendChild(createProductAmountSection(1, id));
    productSection.appendChild(createProductButtonsSection(id));
    return productSection;
}

function createProductNameElement(name, id){
    let productName = document.createElement("input");
    productName.setAttribute("type", "text");
    productName.setAttribute("value", name);
    productName.classList.add("product-name");
    productName.addEventListener("change", () => handleProductNameChange(id));
    return productName;
}

function createProductAmountSection(amount, id){
    let productAmountSection = document.createElement("section");
    productAmountSection.classList.add("product-amount-section");
    productAmountSection.appendChild(createDecreaseProductButton());
    productAmountSection.appendChild(createAmountSpan());
    productAmountSection.appendChild(createIncreaseProductButton());
    return productAmountSection;

    function createDecreaseProductButton(){
        let decreaseProductButton = document.createElement("button");
        if (amount == 1)
            decreaseProductButton.setAttribute("disabled", true);
        decreaseProductButton.setAttribute("data-tooltip", "Зменшити кількість");
        decreaseProductButton.classList.add("decrease-product-button");
        decreaseProductButton.addEventListener("click", () => handleProductAmountChange(id, false));
        decreaseProductButton.innerText = "–";
        return decreaseProductButton;
    }

    function createAmountSpan(){
        let amountSpan = document.createElement("span");
        amountSpan.classList.add("product-amount");
        amountSpan.innerText = amount;
        return amountSpan;
    }

    function createIncreaseProductButton(){
        let increaseProductButton = document.createElement("button");
        increaseProductButton.setAttribute("data-tooltip", "Збільшити кількість");
        increaseProductButton.classList.add("increase-product-button");
        increaseProductButton.addEventListener("click", () => handleProductAmountChange(id, true));
        increaseProductButton.innerText = "+";
        return increaseProductButton;
    }
}

function createProductButtonsSection(id){
    let productButtonsSection = document.createElement("section");
    productButtonsSection.classList.add("product-buttons-section");
    productButtonsSection.appendChild(createProductStateButton());
    productButtonsSection.appendChild(createDeleteProductButton());
    return productButtonsSection;

    function createProductStateButton(){
        let productStateButton = document.createElement("button");
        productStateButton.setAttribute("data-tooltip", "Відмітити як куплений");
        productStateButton.classList.add("product-state-button");
        productStateButton.innerText = "Куплено";
        productStateButton.addEventListener("click", () => { setProductAsBought(id); setStatisticItemAsBought(`S${id}`)});
        return productStateButton;
    }

    function createDeleteProductButton(){
        let deleteProductButton = document.createElement("button");
        deleteProductButton.setAttribute("data-tooltip", "Видалити товар");
        deleteProductButton.classList.add("delete-product-button");
        deleteProductButton.innerText = "×";
        deleteProductButton.addEventListener("click", () => deleteProduct(id));
        return deleteProductButton;
    }
}

function createBoughtProductNameElement(name){
    let productName = document.createElement("span");
    productName.classList.add("product-name")
    productName.innerText = name;
    return productName;
}

function createBoughtProductAmountSection(amount){
    let productAmountSection = document.createElement("section");
    productAmountSection.classList.add("product-amount-section");
    let amountSpan = document.createElement("span");
    amountSpan.classList.add("product-amount");
    amountSpan.innerText = amount;
    productAmountSection.appendChild(amountSpan);
    return productAmountSection;
}

function createBoughtProductButtonsSection(id){
    let productButtonsSection = document.createElement("section");
    productButtonsSection.classList.add("product-buttons-section");
    let productStateButton = document.createElement("button");
    productStateButton.setAttribute("data-tooltip", "Відмітити як не куплений");
    productStateButton.classList.add("product-state-button");
    productStateButton.innerText = "Не куплено";
    productStateButton.addEventListener("click", () => { setProductAsNotBought(id); setStatisticItemAsNotBought(`S${id}`)});
    productButtonsSection.appendChild(productStateButton);
    return productButtonsSection;
}

function createStatisticItemSection(name, id){
    let statisticItem = document.createElement("section");
    statisticItem.id = id;
    statisticItem.classList.add("statistic-item")
    let nameSpan = document.createElement("span");
    nameSpan.classList.add("product-name");
    nameSpan.innerText = name;
    statisticItem.appendChild(nameSpan);
    let amountSpan = document.createElement("span");
    amountSpan.classList.add("product-amount");
    amountSpan.innerText = 1;
    statisticItem.appendChild(amountSpan);
    return statisticItem;
}

function setStatisticItemAsBought(id){
    let statisticItem = document.getElementById(id);
    statisticItem.classList.add("bought-item");
    let boughtStatistics = document.body.querySelector(".bought-statistics .statistic-items");
    boughtStatistics.appendChild(statisticItem);       
}

function setStatisticItemAsNotBought(id){
    let statisticItem = document.getElementById(id);
    statisticItem.classList.remove("bought-item");
    let boughtStatistics = document.body.querySelector(".remaining-statistics .statistic-items");
    boughtStatistics.appendChild(statisticItem);       
}

function handleProductNameChange(id) {
    let product = document.getElementById(id);
    let productName = product.querySelector("input.product-name");
    let statisticProductName = document.getElementById(`S${id}`).querySelector(".product-name");
    let oldName = statisticProductName.innerText.trim();
    let newName = productName.value.trim();
    if (isEmpty(newName)){
        productName.value = oldName;
        window.alert("Product name can not be empty!");
    }
    else {
        if (nameSet.has(newName)){
            productName.value = oldName;
            window.alert("Product with same name already exists!");
        }
        else{
            nameSet.delete(oldName);
            nameSet.add(newName);
            statisticProductName.innerText = newName;
        }
    }
}

function handleProductAmountChange(id, increase) {
    let product = document.getElementById(id);
    let productAmountElement = product.querySelector("span.product-amount");
    let newAmount = parseInt(productAmountElement.innerText) + (increase ? 1 : -1);
    let decreaseProductButton = product.querySelector("button.decrease-product-button");
    if (newAmount != 1)
        decreaseProductButton.removeAttribute("disabled");
    else
        decreaseProductButton.setAttribute("disabled", true);
    productAmountElement.innerText = newAmount;
    let statisticItem = document.getElementById(`S${id}`);
    statisticItem.querySelector(".product-amount").innerText = newAmount;
}

function isEmpty(string){
    return string.trim() == "";
}

document.querySelector(".add-product-form").addEventListener("submit", (e) => {e.preventDefault(); handleAddProduct();});
addProduct("Помідори");
addProduct("Печиво");
addProduct("Сир");