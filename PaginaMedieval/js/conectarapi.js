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

        const Icono_Editar = clonTarjeta.querySelector(".Icono_Editar");
        const PanelCreacionItem = clonTarjeta.querySelector(".PanelCreacionItem");

        const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");
        CrearItem_InputTitulo.value = respuesta.arreglo[i].titutlo;

        const input_imagen = PanelCreacionItem.querySelector(".input_imagen");
        input_imagen.addEventListener("change", () => {
            const archivo = input_imagen.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = () => {
                ImagenPreview.src = reader.result;
            }
        });

        const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");
        ImagenPreview.src = respuesta.arreglo[i].imagen;

        const input_descripcion = PanelCreacionItem.querySelector("textarea");
        input_descripcion.value = respuesta.arreglo[i].descripcion;

        const objeto_recordar = {
            titulo: respuesta.arreglo[i].titutlo,
            imagen: respuesta.arreglo[i].imagen,
            descripcion: respuesta.arreglo[i].descripcion
        }

        const boton_cancelar = PanelCreacionItem.querySelector(".boton_cancelar");
        boton_cancelar.addEventListener("click", () => {
            PanelCreacionItem.style.display = "none";

            CrearItem_InputTitulo.value = objeto_recordar.titulo
            ImagenPreview.src = objeto_recordar.imagen;
            input_descripcion.value = objeto_recordar.descripcion;

        });

        Icono_Editar.addEventListener("click", () => {
            PanelCreacionItem.style.display = "flex";
        });

        const boton_guardar = PanelCreacionItem.querySelector(".boton_guardar");
        const _i = i;

        boton_guardar.addEventListener("click", () => {
            const objeto_tarjeta_modificada = {
                id: respuesta.arreglo[_i].id,
                titutlo: CrearItem_InputTitulo.value,
                descripcion: input_descripcion.value,
                imagen: ImagenPreview.src
            }

            fetch(url_endpoint + "/EditarTarjeta", {
                method: "PUT",
                body: JSON.stringify(objeto_tarjeta_modificada)
            }).then(recurso => recurso.json()).then(respuesta => {
                alert(respuesta.mensaje);
                window.location.reload();
            });
        });


        const Icono_Borrar = clonTarjeta.querySelector(".Icono_Borrar");
        Icono_Borrar.addEventListener("click",() => {
            const objeto_tarjeta_borrar = {
                id: respuesta.arreglo[_i].id
            }
            if(confirm("Estas seguro que quieres borrar esta tarjeta?")){
                fetch(url_endpoint + "/BorrarTarjeta", {
                    method: "DELETE",
                    body: JSON.stringify(objeto_tarjeta_borrar)
                }).then(recurso => recurso.json()).then(respuesta => {
                    alert(respuesta.mensaje);
                    window.location.reload();
                });
            }
            

        });
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
            }).then(recurso => {
                if(recurso.status == 200){
                    window.location.reload();
                }else{
                    alert("Algo salio mal");
                }
            }).then(respuesta => {

            });
    });

    const boton_cancelar = nuevaTarjeta.querySelector(".boton_cancelar");
    boton_cancelar.addEventListener("click", () => {
        nuevaTarjeta.remove();
    });

}