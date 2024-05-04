// Obtener la notificación del carrito y el contador
const cartNotification = document.querySelector('.cart-notification');
const notificationCount = document.querySelector('.notification-count');

// Array para almacenar los productos en el carrito
let cartItems = [];

// Crear el elemento para la ventana del carrito
const cartPopupElement = document.createElement("div");
cartPopupElement.classList.add("cart-popup");

// Crear el contenido de la ventana del carrito
const popupContent = document.createElement("p");
popupContent.textContent = "¡Producto agregado al carrito!";
cartPopupElement.appendChild(popupContent);

// Crear los botones de la ventana del carrito
const buyButton = document.createElement("button");
buyButton.classList.add("buy");
buyButton.textContent = "Comprar";
cartPopupElement.appendChild(buyButton);

const removeButton = document.createElement("button");
removeButton.classList.add("remove");
removeButton.textContent = "Retirar del carrito";
cartPopupElement.appendChild(removeButton);

// Obtener todos los botones "Comprar"
const buyButtons = document.querySelectorAll(".btn-comp");

// Agregar un evento click a los botones "Comprar"
buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Lógica para agregar el producto al carrito
    const product = button.closest('.product-card').querySelector('.product-title').textContent;
    cartItems.push(product);
    updateNotificationCount();
    showCartPopup();
  });
});

// Función para actualizar el contador de la notificación
function updateNotificationCount() {
  notificationCount.textContent = cartItems.length;
}

// Función para mostrar la ventana del carrito
function showCartPopup() {
  // Mostrar la ventana del carrito
  document.body.appendChild(cartPopupElement);
  cartPopupElement.style.display = "block";

  // Ocultar la ventana del carrito al hacer clic fuera de ella
  window.addEventListener("click", (event) => {
    if (event.target === cartPopupElement) {
      cartPopupElement.style.display = "none";
      document.body.removeChild(cartPopupElement);
    }
  });

  // Agregar funcionalidad a los botones de la ventana del carrito
  buyButton.addEventListener("click", () => {
    // Lógica para completar la compra
    console.log("Compra completada");
    cartPopupElement.style.display = "none";
    document.body.removeChild(cartPopupElement);
  });

  removeButton.addEventListener("click", () => {
    // Lógica para retirar el producto del carrito
    console.log("Producto retirado del carrito");
    cartPopupElement.style.display = "none";
    document.body.removeChild(cartPopupElement);
  });
}

// Agregar un evento click a la notificación del carrito
cartNotification.addEventListener('click', () => {
  showCartPopup();
});