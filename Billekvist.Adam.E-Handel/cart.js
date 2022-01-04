// Array med alla produkter
const products = [
    { id: 1, title: "Amper", description: " Energy Drink 1", price: 123 },
    { id: 2, title: "Redbull", description: "Energy Drink 2", price: 456 },
    { id: 3, title: "Nocco", description: "Energy Drink 3", price: 789 },
];

// Hjälpfunktion som tar fram ett unikt "customer ID" från localstorage om det finns
// Annars genereras ett nytt.
// Prova att öppna sidan i incognitomode och se att du får ett nytt varje gång.
function getCustomerId() {
    let customerId = localStorage.getItem("customerid");

    if (customerId === null) {
        customerId = Math.floor(Math.random() * 1000000000) + 1000000000;
        localStorage.setItem("customerid", customerId);
        localStorage.setItem("cart", "");
    }

    return customerId;
}

// Funktion som lägger till produkt med ett visst ID till localstorage
function addToCart(id) {
    for (let product of products) {
        if (product.id === id) {
            localStorage.setItem("cart", localStorage.getItem("cart") + id + ",")
        }
    }
}

// Returnerar varukorgens innehåll uppdelad i en array
function getCart() {
    return localStorage.getItem("cart").trim(",").split(",");
}

// Funktion som ritar upp alla produkter (se arrayen högst upp)
// till div med klassen container
function displayProducts() {
    let container = document.querySelector(".container");

    for (let product of products) {
        container.innerHTML +=
            `<div class="item">` +
            `<h2>${product.title}</h2>` +
            `<p>${product.description}</p>` +
            `<p>Pris: <b>${product.price}</b></p>` +
            `<button onclick="addToCart(${product.id})">Köp</button>`;
    }
}

// Funktion som ritar upp innehållet i varukorgen till div
// med klass cartcontainer
function displayCart() {
    let container = document.querySelector(".cartcontainer");

    let cart = getCart();

    let totalPrice = 0;

    for (let id of cart) {
        for (let product of products) {
            if (product.id == id) {
                container.innerHTML +=
                    `<div class="cartitem">` +
                    `<p><b>${product.title}</b>: ${product.price} SEK</p>` +
                    `</div>`;

                totalPrice += product.price;
            }
        }
    }

    container.innerHTML +=
        `<div class="cartitem">` +
        `<p><b>Totalt</b>: ${totalPrice} SEK</p>` +
        `</div>`;
}

//Funktionen för att spara userns kontaktuppgifter + checkar ifall carten innehåller varor
function UserDetails() {
    if (localStorage.getItem("cart") == 0 || localStorage.getItem("cart") == null) {
        alert("Du har inga varor i korgen");
        return false;
    } 
    else {

        let firstname = document.getElementById("firstname").value;
        localStorage.setItem("firstname", firstname);

        let lastname = document.getElementById("lastname").value;    
        localStorage.setItem("lastname", lastname);

        let email = document.getElementById("email").value;
        localStorage.setItem("email", email);

        let number = document.getElementById("number").value;
        localStorage.setItem("number", number);

        let adress = document.getElementById("adress").value;
        localStorage.setItem("adress", adress);

        let postnummer = document.getElementById("postnummer").value;
        localStorage.setItem("postnummer", postnummer);
        return true;
    }
}



//Tömmer varorna i korgen
function TomKorgen() {
    localStorage.clear("cart");
    location.reload();

}

//Printar ut förnamnet från localstorage
function OrderCompletedPrintNamn(){
    document.getElementById("namnprint").innerHTML="Hej "+ localStorage.getItem("firstname")+ " !"
}

//order complete meddelande + printar ut adressen från local storage
function OrderCompletedPrint(){
    document.getElementById("ordercompleted").innerHTML="Dina varor kommer skickas till "+ localStorage.getItem("adress")+ " inom 5 arbetsdagar."
}

//Invoice genererar ett random nummer mellan 10000 och 1
function OrderCompleteReceipt(){
    document.getElementById("invoice").innerHTML="Ordernummer #"+Math.floor((Math.random() * 10000) + 1);
}

//tar bort varorna efter beställningen är genomförd
function tabortvaror(){
    localStorage.removeItem("cart");
}

//Funktion för betalningsalternativen

function Betalningar(val) {

    if (val==1) {
        document.getElementById("kreditkort").classList.remove("hide");
        document.getElementById("klarna").classList.add("hide");
        document.getElementById("swish").classList.add("hide");
    } 
    else if (val==2){
        document.getElementById("kreditkort").classList.add("hide");
        document.getElementById("klarna").classList.remove("hide");
        document.getElementById("swish").classList.add("hide");
    }
    else if (val==3){
        document.getElementById("kreditkort").classList.add("hide");
        document.getElementById("klarna").classList.add("hide");
        document.getElementById("swish").classList.remove("hide");
    }
}



//fake bankid knapp
function swishvisible(){
 document.getElementById("bankidswish").style.display="block";
}


//printar ut mailen
function KlarnaInformationPrint(){
    document.getElementById("KlarnaInformation").innerHTML = localStorage.getItem("email")
}

//Swish nummer print
function SwishInformationPrint(){
    document.getElementById("SwishInformation").innerHTML = localStorage.getItem("number")
}

//Printar ut infon från checkout 1
function InformationPrint() {
    document.getElementById("information").innerHTML ="Hej " + localStorage.getItem("firstname")+ " "+ localStorage.getItem("lastname")+ "!"+
    "<br><br>" + localStorage.getItem("email") + "<br>" + localStorage.getItem("number") + "<br>" + localStorage.getItem("adress") + " " + localStorage.getItem("postnummer");
}


// Se alltid till att försöka hitta customerID på varje sida
getCustomerId();


/*
Felsökningen!
Internet Explorer 11 supportar bara kod av Javascript ES5, vilket betyder att vårt formulär inte
är supportad då den innehåller features från Javascript ES6, vilket är en nyare version.

Lösningsförslag!
För att få Javascript koden att bli supportad i Internet Explorer 11 krävs det att man använder
Javascript ES5 eller ändre

Om man verkligen behöver använda ES6 features i Internet Explorer 11 kan man använda en transpiler 
(source-to-source compilers) som omvandlar koden till ett supportat format från ES6.
Genom en transpiler kan du få JavaScripts kod att fungera i många av dom äldre webbläsarna.
*/