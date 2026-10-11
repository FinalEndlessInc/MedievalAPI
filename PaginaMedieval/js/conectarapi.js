const plantilla_tarjeta = document.querySelector(".ContenedorItem");
plantilla_tarjeta.remove();

const ColeccionItems = document.querySelector("#ColeccionItems");

const PantallaAgregarItem = document.querySelector(".PantallaAgregarItem");

const url_endpoint = "http://localhost:3000";

fetch(url_endpoint).then(recurso => recurso.json()).then(respuesta => {
    for(i=0; i < respuesta.arreglo.length; i++){
        const clonTarjeta = plantilla_tarjeta.cloneNode(true);
        ColeccionItems.appendChild(clonTarjeta);

        const Titulo = clonTarjeta.querySelector(".Titulo");
        Titulo.innerHTML = respuesta.arreglo[i].titutlo;

        const Descripcion = clonTarjeta.querySelector(".Descripcion");
        Descripcion.innerHTML = respuesta.arreglo[i].descripcion;

        const Imagen = clonTarjeta.querySelector(".Imagen");
        Imagen.style.backgroundImage = "url(" + respuesta.arreglo[i].imagen + ")";
    }
    ColeccionItems.appendChild(PantallaAgregarItem);
});

function CrearTarjeta(){
    const nuevaTarjeta = plantilla_tarjeta.cloneNode(true);
    ColeccionItems.appendChild(nuevaTarjeta);

    const PanelCreacionItem = nuevaTarjeta.querySelector(".PanelCreacionItem");
    PanelCreacionItem.style.display = "flex";

    const CrearItem_InputTitulo = nuevaTarjeta.querySelector(".CrearItem_InputTitulo");
    const input_imagen = nuevaTarjeta.querySelector(".input_imagen");
    const ImagenPreview = nuevaTarjeta.querySelector(".ImagenPreview");
    const input_descripcion = nuevaTarjeta.querySelector("textarea");

    input_imagen.addEventListener("change", () =>{
        const archivo = input_imagen.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(archivo);

        reader.onload = () => {
            ImagenPreview.src = reader.result;
        }
    });

    const boton_guardar = nuevaTarjeta.querySelector(".boton_guardar");
    boton_guardar.addEventListener("click", function(){
        const objeto_nueva_tarjeta = {
                titulo: CrearItem_InputTitulo.value,
                descripcion: input_descripcion.value,
                imagen: ImagenPreview.src
            }

            fetch(url_endpoint + "/Crear", {
                method: "POST",
                body: JSON.stringify(objeto_nueva_tarjeta)
            });
    });
}