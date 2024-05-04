

// Función para manejar el cambio de color de un producto en el carrito
function handleColorChange(event, productId) {
    const selectedColor = event.target.value;
    const selectedColorDisplay = document.getElementById(
        `selected-color-display-${productId}`
    );
    selectedColorDisplay.textContent = selectedColor; // Mostrar la selección como texto en el lugar deseado
    console.log("Color seleccionado:", selectedColor);
    // Aquí puedes hacer lo que desees con el color seleccionado
}