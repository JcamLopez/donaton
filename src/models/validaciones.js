const validar = {}

validar.datos = (dato) => {
    if (dato == undefined || dato == "" || dato == null) {
        return "No registra"
    } else {
        return dato
    }
}
export default validar;