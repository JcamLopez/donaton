

const controller = {};


controller.vista_index = (req, res) => {

    res.render('./index', {
        datos: req.session.permisos_usuario,
        helpers: {
            miHelper: function (prueba) {
                if (prueba == "ok") {
                    return true;
                } else {
                    return false;
                }




            }
        }
    })
}


export default controller