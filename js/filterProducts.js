
let  searchSelector=document.querySelector("#buscador");
searchSelector.addEventListener("keyup", event=>captureText(event));

function captureText(event) {
    const searchText = event.target.value.trim().toLowerCase(); // Captura el texto y lo convierte a minúsculas
    const filteredProducts = productsData.filter(product => product.title.toLowerCase().includes(searchText)); // Filtra los productos cuyo título incluya el texto capturado
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Limpia el contenedor antes de renderizar los productos filtrados
  
    const productRenderer = new ProductRenderer(filteredProducts); // Crea una nueva instancia de ProductRenderer con los productos filtrados
    productRenderer.renderProducts(); // Renderiza los productos filtrados en la vista
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.form input');
    searchInput.addEventListener('input', captureText);
  });
  