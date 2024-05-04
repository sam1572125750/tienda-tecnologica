
  //TODO 2 forma de hacerlo suspuestamente la mas dinamica y obtima

  class ProductRenderer {
    constructor(products) {
      this.products = products;
    }
  
    renderProducts() {
      const container = document.querySelector('.container');
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');
      container.appendChild(productContainer);
  
      this.products.forEach(product => {
        const productCardHTML = this.createCard(product);
        productContainer.insertAdjacentHTML('beforeend', productCardHTML);
      });
    }
  
    createCard(product) {
      return `
        <a class="product-card" href="./detalles.html?id=${product.id}">
          <img class="product-img" src="${product.imgSrc}" alt="${product.title}">
          <div class="product-info">
            <span class="product-title">${product.title}</span>
            <span class="product-description">${product.description}</span>
            <div class="product-price-block">
              <span class="price">${product.price}</span>
              <span class="discount">${product.discount}</span>
            </div>
            <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
          <div class="botones-compras">
            <button class="btn-comp">Carrito</button>
          </div>
        </a>
      `;
    }
  }
const productsData = [
  {
    id:14534,
    imgSrc: '../imagenes_main/telefono.jpg',
    title: 'Macbook Pro 15\'4',
    description: 'Space Gray',
    price: '$550',
    discount: '50% Off',
    images: ['../imagenes_main/telefono.jpg', '../imagenes_main/cel-verti.webp', '../imagenes_main/cel-fon.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  },
  { id:2435346,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp 13\'4',
    description: 'Space Gray',
    price: '$950',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  { id:2222,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp 13\'4',
    description: 'Space Gray',
    price: '$950',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  { id:2435,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp 13\'4',
    description: 'Space Gray',
    price: '$950',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  { id:243534,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp 13\'4',
    description: 'Space Gray',
    price: '$950',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  {id:3456,
    imgSrc: '../imagenes_main/acer.webp',
    title: 'sansung 15\'4',
    description: 'Space Gray',
    price: '$750',
    discount: '50% Off',
    images: ['../imagenes_main/acer.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,

  {id:54444,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp 15\'4',
    description: 'Space Gray',
    price: '$900',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  {id:6345,
    imgSrc: '../imagenes_main/gamer.webp',
    title: 'lenovo Pro 15\'4',
    description: 'Space Gray',
    price: '$700',
    discount: '50% Off',
    images: ['../imagenes_main/gamer.webp',  '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  {id:745345,
    imgSrc: '../imagenes_main/counter.webp',
    title: 'hp Pro 15\'4',
    description: 'Space Gray',
    price: '$855',
    discount: '50% Off',
    images: ['../imagenes_main/counter.webp', '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }
  ,
  {id:834545,
    imgSrc: '../imagenes_main/acer.webp',
    title: 'sansung Pro 15\'4',
    description: 'Space Gray',
    price: '$750',
    discount: '50% Off',
    images: ['../imagenes_main/acer.webp', '../imagenes_main/lap-parte.jpeg', '../imagenes_main/lap-guarda.jpg'],
    colors: ['Negro espacial', 'Gris espacial'],
  }

  // Agrega más productos aquí si es necesario
];

// Crear instancia de ProductRenderer y renderizar productos
const productRenderer = new ProductRenderer(productsData);
productRenderer.renderProducts();


function printTotal() {
  const totalContainer = document.getElementById("total");
  if (!totalContainer) {
      console.error("El elemento con id 'total' no se encontró en el DOM");
      return;
  }
  const totalTemplateHTML = createTotalTemplate(cartProducts);
  totalContainer.innerHTML = totalTemplateHTML;
  // Resto del código para imprimir el total...
}