import { pais, nacionalidad } from '../models/pais.js'
const controller = {};


controller.vista_login = (req, res) => {
    pais.ConsultarNaniconalidad().then((respuesta) => {
        if (respuesta == "se consulto la nacionalidad de manera correcta") {
            res.json({
                status: "ok",
                url:'/login',
                nacionalidad: JSON.stringify(nacionalidad)
            });
        }
    }).catch((err) => {
        console.log("Error " + err)
    });
    //res.render('./login')
}



export default controller