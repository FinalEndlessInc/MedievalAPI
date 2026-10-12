const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

const archivo = JSON.parse(fs.readFileSync("./archivo.json"));

const server = http.createServer((request,response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    switch(request.method){
        case "GET":
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(archivo));
        break;

        case "POST":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {
                const objeto_nuevo_item = JSON.parse(informacion);
                console.log(objeto_nuevo_item);

                const objeto_nueva_tarjeta = {
                    id: archivo.arreglo[archivo.arreglo.length - 1].id + 1,
                    titutlo: objeto_nuevo_item.titulo,
                    descripcion: objeto_nuevo_item.descripcion,
                    imagen: objeto_nuevo_item.imagen
                }

                archivo.arreglo.push(objeto_nueva_tarjeta);

                fs.writeFile("./archivo.json", JSON.stringify(archivo), err => {
                    if(err){
                        const objeto_respuesta = {
                            mensaje: "Algo salio mal"
                        }
                        console.log(err)
                        response.statusCode = 400;
                        response.setHeader("Content.Type", "application/json");
                        response.end(JSON.stringify(objeto_respuesta));

                    }else{
                        const objeto_respuesta = {
                            mensaje: "Tarjeta guardada"
                        }

                        response.statusCode = 200;
                        response.setHeader("Content.Type", "application/json");
                        response.end(JSON.stringify(objeto_respuesta));
                    }
                });
            });
        break;

        case "PUT":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {
                const objeto_tarjeta_editada = JSON.parse(informacion);
                
                for(i = 0; i < archivo.arreglo.length; i++){
                    if(objeto_tarjeta_editada.id == archivo.arreglo[i].id){
                        archivo.arreglo[i] = objeto_tarjeta_editada;
                    }
                }
                
                fs.writeFile("./archivo.json", JSON.stringify(archivo), err => {
                    if(err){
                        console.log(err);
                    }else{
                        const objeto_respuesta = {
                            mensaje: "La tarjeta ha sido sobreescrita"
                        }
                        response.statusCode = 200;
                        response.setHeader("Content.Type", "application/json");
                        response.end(JSON.stringify(objeto_respuesta));
                    }
                });
            });

        break;

        case "DELETE":
        break;

        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;
    }
});

server.listen(puerto, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});