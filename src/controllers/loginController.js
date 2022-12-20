import { pais, nacionalidad } from '../models/pais.js'
const controller = {};


controller.vista_login = (req, res) => {
    res.render('./login')
}

controller.cargar_nacionalidad = (req, res) => {
    pais.ConsultarNaniconalidad().then((respuesta) => {
        if (respuesta == "se consulto la nacionalidad de manera correcta") {
            res.json({
                status: 'ok',
                nacionalidad: nacionalidad
            })
        }
    }).catch((err) => {
        console.log("Error " + err)
    });
}

/*controller.registro_usuario = (req,res) => {
     console.log(req.body)
}*/



export default controller