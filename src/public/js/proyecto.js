const proyecto = document.getElementById('modal_proyecto');

if (proyecto != null && proyecto != "" && proyecto != undefined) {


    var btn_eliminar = document.querySelectorAll('.btn_eliminar_proyuecto');

    btn_eliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            alert('presiososossoso '+ boton.id )
            //alert('presiososossoso ' + boton.id)
        })
    });


}