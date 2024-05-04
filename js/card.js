// Define cartProducts outside the function
let cartProducts = [];

// Check if the "cart" key exists in localStorage and has content
if (localStorage.getItem("cart")) {
  // If it exists, get the content and parse it to an array
  cartProducts = JSON.parse(localStorage.getItem("cart"));
  // Check if the content is an array, if not, convert it to an empty array
  if (!Array.isArray(cartProducts)) {
    cartProducts = [];
  }
}


// Función para formatear el precio unitario con descuento
function formatPriceWithDiscount(price, discountPercentage, quantity) {
    const priceWithoutDiscount = parseInt(price.replace(/\D/g, ""), 10); // Eliminar los caracteres no numéricos y convertir a entero
    const priceWithDiscount = priceWithoutDiscount * (1 - discountPercentage / 100);
    const formattedPrice = priceWithDiscount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }); // Formatear como moneda sin decimales
    return formattedPrice.replace(".", " "); // Reemplazar el punto por un espacio
}

// Función para calcular el precio total con descuento y formatearlo
function calculateTotalPriceWithDiscount(totalPrice) {
    const formattedTotalPrice = totalPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }); // Formatear como moneda sin decimales
    return formattedTotalPrice.replace(".", " "); // Reemplazar el punto por un espacio
}

// Función para calcular el precio total de un producto en el carrito
function calculateTotalPrice(product, productWithDiscount) {
    if (productRenderer && productRenderer.products) {
        const unitPrice = parseInt(product.price.replace(/\D/g, ""), 10); // Eliminar los caracteres no numéricos y convertir a entero
        const quantity = parseInt(product.quantity, 10); // Obtener la cantidad seleccionada

        // Verificar si el producto tiene un descuento definido
        const discountPercentage = productWithDiscount
            ? parseFloat(productWithDiscount.discount.replace(/\D/g, ""))
            : 0;

        // Verificar si tanto el precio como el descuento están definidos
        if (isNaN(unitPrice) || isNaN(quantity) || isNaN(discountPercentage)) {
            return "Error en el cálculo del precio total";
        }

        const priceWithoutDiscount = unitPrice * quantity; // Calcular el precio total sin descuento
        const discountedPrice = priceWithoutDiscount * (1 - discountPercentage / 100); // Calcular el precio total con descuento
        const formattedPrice = discountedPrice.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }); // Formatear como moneda sin decimales
        return formattedPrice.replace(".", " "); // Reemplazar el punto por un espacio
    }
}

function createCartCard(product) {
    if (productRenderer && productRenderer.products) {
        const productWithDiscount = productRenderer.products.find(p => p.id === product.id); // Obtener el producto con descuento
        const discountPercentage = parseFloat(productWithDiscount.discount.replace(/[^0-9]+/g, '')); // Obtener el porcentaje de descuento
        return `
        <div class="cart-product">
            <div class="contenido-card-compra">
                <div class="imagen-selecionada">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="detalles-producto-comprado">
                    <p>${product.title}</p>
                    <div id="selected-color-display-${product.id}" class="selected-color-display"></div> <!-- Agregar un elemento para mostrar el color seleccionado -->
                    <div id="description-container">
                        <p>${product.description}</p>
                    </div>
                    <input type="number" value="${product.quantity}" min="1" onchange="handleQuantityChange(event, ${product.id})"> <!-- Cambiar el evento onchange -->
                </div>
                <div class="barra-pago-total">
                    <p class="unit-price">${formatPriceWithDiscount(
                        product.price,
                        discountPercentage,
                        product.quantity
                    )} con ${productWithDiscount.discount}</p>
                    <!-- Mostrar el precio unitario con descuento -->
                    <p class="total-price" id="total-price-${product.id}">${calculateTotalPrice(product,productWithDiscount)}
                    </p> <!-- Identificador único para el precio total -->
                </div>
                <button class="remove-product-btn" data-product-id="${product.id}">Eliminar</button>
            </div>
        </div>
        `;
    } else {
        console.error("La variable productRenderer o productRenderer.products no están definidas.");
        return ""; // Retorna una cadena vacía para evitar errores
    }
}

// Función para manejar el cambio de cantidad de un producto en el carrito
function handleQuantityChange(event, productId) {
    updatePriceAndTotal(event, productId);
}


// Función para manejar el cambio de color de un producto en el carrito
function handleColorChange(event, productId) {
    const selectedColor = event.target.value;
    const selectedColorDisplay = document.getElementById(
        `selected-color-display-${productId}`
    );
    if(selectedColorDisplay) {
        selectedColorDisplay.textContent = selectedColor; // Mostrar la selección como texto en el lugar deseado
        console.log("Color seleccionado:", selectedColor);
        // Aquí puedes hacer lo que desees con el color seleccionado
    } else {
        console.error(`Elemento color 'selected-color-display-${productId}' no encontradoooo.`);
    }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el elemento select por su ID
    const colorSelect = document.getElementById(`color-${id}`);

    // Verificar si se encontró el elemento
    if(colorSelect) {
        // Agregar un event listener para el evento change
        colorSelect.addEventListener('change', (event) => {
            const selectedColor = event.target.value;
            handleColorChange(selectedColor, id); // Aquí se pasa el valor del color y el ID del producto a la función handleColorChange
        });
    } else {
        console.error(`Elemento 'color-${id}' no encontradoaaa.`);
    }
});


function updatePriceAndTotal(event, productId) {
    const product = cartProducts.find(p => p.id === productId); // Obtener el producto del carrito
    const productWithDiscount = productRenderer.products.find(p => p.id === product.id); // Obtener el producto con descuento
    const discountPercentage = parseFloat(productWithDiscount.discount.replace(/[^0-9]+/g, "")); // Obtener el porcentaje de descuento
    const unitPrice = parseFloat(product.price.replace(/[^0-9.]+/g, "")); // Obtener el precio unitario

    const quantity = parseInt(event.target.value, 10); // Obtener la nueva cantidad
    product.quantity = quantity; // Actualizar la cantidad en el producto del carrito

    // Calcular el nuevo precio total del producto
    const newTotalPrice = calculateTotalPrice(product, productWithDiscount);

    // Actualizar el precio total del producto en el HTML
    const totalPriceElement = document.getElementById(`total-price-${productId}`);
    totalPriceElement.textContent = newTotalPrice;

    // Llamar a la función para actualizar el total del carrito
    updateCart();
}

// Función para eliminar un producto del carrito
function removeProductFromCart(productId) {
    console.log("Removiendo producto con ID:", productId);
    console.log("Carrito antes de eliminar:", cartProducts);

    // Convertir productId a un número
    productId = parseInt(productId, 10);

    // Filtrar cartProducts
    cartProducts = cartProducts.filter(product => product.id !== productId);

    console.log("Carrito después de eliminar:", cartProducts);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    console.log("Carrito guardado en localStorage:", localStorage.getItem("cart"));

    // Actualizar la visualización de las tarjetas de productos y el total
    printCartCards();
    printTotal();
}

// Función para imprimir las tarjetas de los productos en el carrito
function printCartCards() {
    console.log("Imprimiendo tarjetas de productos en el carrito...");
    const cartProductsContainer = document.getElementById("cartproducts");
    if (!cartProductsContainer) {
        console.error("El elemento con id 'cartproducts' no se encontró en el DOM");
        return;
    }
    cartProductsContainer.innerHTML = "";

    cartProducts.forEach(product => {
        const cartCardHTML = createCartCard(product);
        cartProductsContainer.insertAdjacentHTML("beforeend", cartCardHTML);
    });

    // Agregar event listener a los botones de eliminación
    const removeButtons = document.querySelectorAll(".remove-product-btn");
    console.log("Número de botones de eliminación:", removeButtons.length);
    removeButtons.forEach(button => {
        console.log("Añadiendo event listener al botón de eliminación...");
        button.addEventListener("click", () => {
            console.log("Se hizo clic en el botón de eliminación.");
            const productId = button.getAttribute("data-product-id");
            console.log("ID del producto a eliminar:", productId);
            removeProductFromCart(productId);
        });
    });
}


