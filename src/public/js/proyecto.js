const proyecto = document.getElementById('modal_proyecto');

if (proyecto != null && proyecto != "" && proyecto != undefined) {

    var id_proyecto;
    var btn_eliminar = document.querySelectorAll('.btn_actualizar_proyecto');
    var img = document.getElementById('img')
    var nombre_proyecto = document.getElementById('nombre')
    var descripcion = document.getElementById('descripcion')
    var responsable = document.getElementById('responsable')
    var btn_actualizar = document.getElementById('btn_actualizar')
    var img_proyecto = document.getElementById('img_proyecto')
    btn_eliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            id_proyecto = boton.id
            var datos = new URLSearchParams();
            datos.append("id_proyecto", id_proyecto);
            fetch("/abrir/modal/actualizar/proyecto", {
                method: "post",
                body: datos
            }).then(res => res.json())
                .then(res => {
             /*        img.src = res.img */
                    nombre_proyecto.value = res.proyecto
                    descripcion.value = res.descripcion
                    responsable.value = res.responsable
                    $('#edit-proyects').modal('show');
                })
        })
    });


    btn_actualizar.addEventListener('click', () => {
        var datos = new URLSearchParams();
        datos.append("id_proyecto", id_proyecto);
        datos.append("responsable", responsable.value);
        datos.append("nombre_proyecto", nombre_proyecto.value);
        datos.append("descripcion", descripcion.value);
        datos.append("name_img", img_proyecto.id);
        fetch("/actualizar/proyecto", {
            method: "post",
            body: datos
        }).then(res => res.json())
            .then(res => {
                if (res.status = "ok") {
                    window.location.href = res.url;
                    $('#edit-proyects').modal('hide')
                }


            })

    })





}