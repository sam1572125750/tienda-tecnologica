//todo entro de una función que se ejecute cuando la página esté completamente cargada 

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get('id');
console.log('ID del producto:', id); // Agrega esta línea para verificar el valor de id

function printDetails(id) {
  
  const product = productsData.find((each) => each.id === parseInt(id));
    const detailsSelector = document.querySelector("#detalle-final-renderizado");

    if (!product) {
        detailsSelector.innerHTML = '<p>No se encontró el producto solicitado.</p>';
        return;
    }
  // const product = productsData.find((each) => each.id === parseInt(id));
  // const detailsSelector = document.querySelector("#detalle-final-renderizado");

  // if (!detailsSelector) {
  //     console.error("El elemento con id 'detalle-final-renderizado' no se encontró en el DOM");
  //     return;
  // }
  const imagesHTML = product && product.images && product.images.length > 0 ? product.images.map((imageSrc, index) => `
    <div class="thumbnail-container">
      <img src="${imageSrc}" alt="Descripción de la imagen ${index + 1}" data-src="${imageSrc}" onclick="changeMini(event)" />
    </div>
  `).join("") : "";

  const mainImageHTML = `<img id="bigImg" class="main-image" src="${product.images[0]}" alt="Descripción de la imagen principal" />`;

  const descriptionHTML = `
    <div class="product-description-block">
      <h1 class="title">${product.title}</h1>
      <form class="selector">
      <fieldset>
    <label class="label" for="color-${id}">Color</label>
    <select id="color-${id}" onchange="handleColorChange(this.value, ${id})">
    ${product.colors ? product.colors.map((color) => `<option value="${color}">${color}</option>`).join("") : ''}
  </select>
  
  </fieldset>
      </form>
      <div class="descripcion">
        <h1>Descripción:</h1>
        <p>${product.description}</p>
      </div>
    </div>
  `;

  const checkoutHTML = `
    <div class="checkout-container">
      <span class="checkout-total-label">Total:</span>
      <h2 class="checkout-total-price">${product.price}</h2>
      <p class="checkout-description">Incluye impuesto PAIS y percepción AFIP. Podés recuperar AR$ 50711 haciendo la solicitud en AFIP.</p>
      <ul class="checkout-policy-list">
        <li>
          <span class="policy-icon"><img src="./icons/truck.png" alt="Truck" /></span>
          <span class="policy-desc">Agrega el producto al carrito para conocer los costos de envío</span>
        </li>
        <li>
          <span class="policy-icon"><img src="./icons/plane.png" alt="Plane" /></span>
          <span class="policy-desc">Recibí aproximadamente entre 10 y 15 días hábiles, seleccionando envío normal</span>
        </li>
      </ul>
      <div class="checkout-process">
        <div class="top">
          <input id="quantity-${id}" type="number" value="1" min="1" onchange="changeSubtotal(event)" />
          <button class="btn-primary" onclick="saveProduct(${id})">Comprar</button>
        </div>
        <div class="bottom">
          <button class="btn-outline" onclick="saveProduct(${id})">Añadir al Carrito</button>
          <span class="subtotal-display"></span>
        </div>
      </div>
    </div>
  `;

  const finalHTML = `
    <div class="columns-container">
      <div class="product-images-block">
        ${imagesHTML}
        ${mainImageHTML}
      </div>
      ${descriptionHTML}
      ${checkoutHTML}
    </div>
  `;

  // detailsSelector.innerHTML = finalHTML;
  if (detailsSelector) {
    detailsSelector.innerHTML = finalHTML;
  } else {
    console.error("El elemento con id 'detalle-final-renderizado' no se encontró en el DOM");
  }
}

function saveProduct(id) {
  const product = productsData.find((each) => each.id === parseInt(id));
  const selectedColor = document.querySelector(`#color-${id}`).value;
  const selectedQuantity = document.querySelector(`#quantity-${id}`).value;
  
  const productToSave = {
    id: id,
    title: product.title,
    price: product.price,
    image: product.images[0],
    color: selectedColor,
    quantity: selectedQuantity
  };
  let cart = [];

  // Verificar si existe la clave "cart" en localStorage y si tiene contenido
  if (localStorage.getItem("cart")) {
    // Si existe, obtener el contenido y parsearlo a un array
    cart = JSON.parse(localStorage.getItem("cart"));
    // Verificar si el contenido es un array, si no lo es, convertirlo a un array vacío
    if (!Array.isArray(cart)) {
      cart = [];
    }
  }

  // Agregar el nuevo producto al array de productos
  cart.push(productToSave);
console.log(cart)
  // Convertir el array a formato JSON y guardarlo en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

}


// Función para cambiar la imagen ampliada al hacer clic en una miniatura
function changeMini(event) {
  console.log('Función changeMini() ejecutada');
  const selectedSrc = event.target.getAttribute('data-src');
  const bigSelector = document.querySelector("#bigImg");
  bigSelector.src = selectedSrc;

  
   // Remover la clase 'selected' de todas las miniaturas
   const thumbnails = document.querySelectorAll(".thumbnail-container img");
   thumbnails.forEach(thumbnail => {
       thumbnail.classList.remove("selected");
   });

   // Agregar la clase 'selected' a la miniatura actual
   event.target.classList.add("selected");
}

// Función para actualizar el subtotal al cambiar la cantidad

function changeSubtotal(event) {
  const quantity = parseInt(event.target.value);
  const product = productsData.find((each) => each.id === parseInt(id));
  const priceWithoutDiscount = parseInt(product.price.replace(/\D/g, ''));
  const totalWithoutDiscount = priceWithoutDiscount * quantity;
  const discount = parseInt(product.discount.replace(/\D/g, ''));
  const totalWithDiscount = totalWithoutDiscount - (totalWithoutDiscount * (discount / 100));
  const formattedTotalWithDiscount = totalWithDiscount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
  });
  const subtotalDisplay = document.querySelector('.subtotal-display');
  subtotalDisplay.textContent = `Subtotal: ${formattedTotalWithDiscount}`;
}

document.addEventListener('DOMContentLoaded', function() {
  // Verifica que id tenga un valor válido antes de llamar a printDetails
  if (id) {
      printDetails(id);
  } else {
      console.error("ID del producto no válido");
  }
});



let cartCardsPrinted = false;

function printCartCardsOnce() {
    if (!cartCardsPrinted) {
        printCartCards();
        cartCardsPrinted = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    printCartCardsOnce();
});



