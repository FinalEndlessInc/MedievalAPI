const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

const archivo = JSON.parse(fs.readFileSync("./archivo.json"));

const server = http.createServer((request,response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");

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
                    id: archivo.arreglo[archivo.arreglo.length - 1].id + 1
                }

                console.log(objeto_nueva_tarjeta);
            });
        break;

        case "PUT":

        break;

        case "DELETE":
        break;
    }
});

server.listen(puerto, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});