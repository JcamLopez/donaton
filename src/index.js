import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path';
import url from 'url';
import index from './routes/index.routes.js'
import login from './routes/login.routes.js'
import proyectos from './routes/proyectos.routes.js'

//Path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//inicializar 
const app = express();

//Confirguraciones
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));

//Motor de plantillas handlebars
app.engine('.hbs', engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

//Midelware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//rutas
app.use(index);
app.use(login);
app.use(proyectos);
//public 
app.use(express.static(path.join(__dirname, "public")))

//Ejecutar el servidor
app.listen(app.get("port"), () => {
    console.log(
        "El servidor se inicio en el puerto " +
        "http://localhost:" +
        app.get("port")
    );
});
