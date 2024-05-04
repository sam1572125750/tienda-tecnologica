//todo caso 1 simple
// const h2tag = document.createElement("h2");
// h2tag.textContent = "este es el caso 1 simple agregado desde js ";
// h2tag.style.fontSize = "70px";
// h2tag.style.backgroundColor = "gray";
// h2tag.style.border = "5px solid red";
// h2tag.style.color = "#f3f3f3";

// const preselector = document.querySelector("#sub");
// preselector.appendChild(h2tag)

//todo caso 2 con array

// let array = ["juan", "celular", "makocc pro 15"]
// const pre4 = document.querySelector("#pro15");
// for (const testte of array) {
//     const h3tag = document.createElement("h3");
//     h3tag.style.fontSize = "30px";
//     h3tag.style.color = "red"
//     h3tag.textContent = testte
//     pre4.appendChild(h3tag)
// }

//todo caso 3 con objetos

// const objetos = [
//     { nombre: "celular", precio: 1000 },
//     { nombre: "tablet", precio: 800 },
//     { nombre: "lapto", precio: 1500 }
// ]
// const produc2 = document.querySelector("#objetos2");
// objetos.forEach((cadaElemento) => {
//     const ptag = document.createElement("p");
//     ptag.style.fontSize = "30px";
//     ptag.style.color = "green"
//     ptag.style.fontSize = "30px"
//     ptag.style.fontWeight = "bold"
//     ptag.textContent = cadaElemento.nombre.toUpperCase() + " el costo es de: " + cadaElemento.precio
//     produc2.appendChild(ptag)

// })

//todo caso 4 con array y objetos de store tienda de productos
function redirectToCardPage() {
    window.location.href = 'card.html';
}


const navSelector = document.getElementById("nav");
const options = [
    { title: "Ofertas de la semana", linkTo: "#" },
    { title: "Productos", linkTo: "#" },
    { title: "Contactos", linkTo: "#" },
    { title: "Marcas", linkTo: "#" },
    { title: "Empresa", linkTo: "#" }
   
];
for (let option of options) {

    const anchor = document.createElement("a"); //todo esta creando un elemento un "a"en html. 
    anchor.className = "nav-button";
    anchor.textContent = option.title;
    anchor.href = option.linkTo;
    navSelector.appendChild(anchor);
 
}
