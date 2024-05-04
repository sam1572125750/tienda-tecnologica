
const optionss = [
    { title: "Ofertas de la semana", linkTo: "#" , opts: ["Laptops", "Audio", "Auticulares"] },
    { title: "Cómo comprar", linkTo: "#" , opts: ["Formas de pago", "Envios", "Devoluciones"]},
    { title: "Costos y tarifas", linkTo: "#" , opts: ["Impuestos", "Facturación"]},
    { title: "Mis pedidos", linkTo: "#", opts: ["Pedir nuevamente", "Lista de deseos"]},
    { title: "Garantía de Entrega", linkTo: "#" , opts: []},
];



const footerSelector = document.querySelector("#footer");

/*
<div class="col">
    <ul>
        <li class="col-main-item">
        <a href="#">Ofertas de la semana</a>
        </li>
        <li><a href="#">Laptops</a></li>
        <li><a href="#">Audio</a></li>
        <li><a href="#">Auticulares</a></li>
    </ul>
</div> 
*/

// Itera con for of, de manera que cada iteración:
for (let option of optionss) {

    const div_col = document.createElement("div"); 
    div_col.className = "col";
    const ul_col = document.createElement("ul"); 
    // ul_col.className = "col";
    const li_col = document.createElement("li"); 
    li_col.className = "col-main-item";

    const anchor = document.createElement("a"); //Crea las etiquetas correspondientes con el método createElement 
    anchor.className = "fotter-option"; // y las propiedades/estilos correspondientes.
    anchor.textContent = option.title; // Asigna el texto de la propiedad title de cada objeto con la propiedad textContent
    anchor.href = option.linkTo; // Define la propiedad href hacia la propiedad linkTo de cada objeto.

    
    // footerSelector.appendChild(anchor); // Luego “agregar un hijo”  al navSelector
    // div_col.appendChild(anchor); // Luego “agregar un hijo”  al navSelector
    li_col.appendChild(anchor); // Luego “agregar un hijo”  al navSelector 

    // Las opciones de cada columna se deben mapear con otro for of.
    for (let sub_option of option.opts) {
        const s_li_col = document.createElement("li"); 
        // s_li_col.className = "col-main-item";


        const s_anchor = document.createElement("a"); //Crea las etiquetas correspondientes con el método createElement 
        s_anchor.className = "fotter-option"; // y las propiedades/estilos correspondientes.
        s_anchor.textContent = sub_option; // Asigna el texto de la propiedad title de cada objeto con la propiedad textContent
        // s_anchor.href = option.linkTo; // Define la propiedad href hacia la propiedad linkTo de cada objeto.
        // footerSelector.appendChild(s_anchor);
        // div_col.appendChild(s_anchor);
        s_li_col.appendChild(s_anchor);
        ul_col.appendChild(s_li_col);
    }
    ul_col.appendChild(li_col);
    div_col.appendChild(ul_col);
    // console.log(div_col);
    footerSelector.appendChild(div_col); // Luego “agregar un hijo”  al navSelector
}

