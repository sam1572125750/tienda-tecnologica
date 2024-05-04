// Función para crear el template del cuadro de cálculo del total
function createTotalTemplate(arrayOfProducts) {
    let total = 0;

    // Calcular el total sumando los precios totales de cada producto
    arrayOfProducts.forEach(product => {
        const productWithDiscount = productRenderer.products.find(p => p.id === product.id);
        total += parseInt(calculateTotalPrice(product, productWithDiscount).replace(/\D/g, ''), 10); // Usar parseInt con base 10 para evitar problemas con números octales
    });

    // Formatear el total como moneda con espacio en lugar de punto
    const formattedTotal = total.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    });
    const totalWithSpace = formattedTotal.replace('.', ' ');

    // Mostrar el total en el template
    return `
        <h4 class="total-title">Resumen del pedido</h4>
        <p class="total-p">Total: ${totalWithSpace}</p>
        <p class="total-p">Incluye impuestos PAIS y percepción AFIP</p>
        <button id="buy" type="button">COMPRAR</button>
    `;
}



window.addEventListener('DOMContentLoaded', function() {
    printTotal();
    printCartCards();
     // Agregar event listeners a los botones de eliminación
});

function updateCart() {
    // Código para actualizar el carrito...
    printTotal(); // Llamar a printTotal para actualizar el total
    printCartCards(); // Llamar a printCartCards para imprimir los productos del carrito
  }