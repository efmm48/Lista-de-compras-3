// Manejo del formulario
const form = document.getElementById("shopping-form");
const productList = document.getElementById("shopping-list");
const shareButton = document.getElementById("share-button");

// Array para almacenar la lista de compras
let shoppingList = [];

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    const productInput = document.getElementById("product-input");
    const priceInput = document.getElementById("price-input");
    const marketInput = document.getElementById("market-input");

    const product = productInput.value;
    const price = priceInput.value;
    const market = marketInput.value;

    if (product !== "" && price !== "" && market !== "") {
        const item = {
            product: product,
            price: price,
            market: market
        };

        shoppingList.push(item);

        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${product}</strong> - Precio: ${price} - Mercado: ${market}`;
        productList.appendChild(listItem);

        // Limpiar campos del formulario
        productInput.value = "";
        priceInput.value = "";
        marketInput.value = "";
    }
});

shareButton.addEventListener("click", function() {
    const message = generateMessage(shoppingList);
    const encodedMessage = encodeURIComponent(message);

    if (isMobileDevice()) {
        const whatsappURL = `whatsapp://send?text=${encodedMessage}`;
        window.open(whatsappURL);
    } else {
        const whatsappWebURL = `https://web.whatsapp.com/send?text=${encodedMessage}`;
        window.open(whatsappWebURL);
    }
});

function generateMessage(list) {
    let message = "Lista de Compras:\n";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        message += `Producto: ${item.product}, Precio: ${item.price}, Mercado: ${item.market}\n`;
    }

    return message;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
