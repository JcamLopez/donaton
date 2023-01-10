const usuario = document.getElementById('panel-admin')
if (usuario != null && usuario != undefined && usuario != "") {
  var btn_eliminar = document.querySelectorAll('.btn_eliminar_usuario');
  btn_eliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      var id_usuario = boton.id
      var delimitador;
      for (let i = 0; i < id_usuario.length + 1; i++) {
        if (id_usuario.substring(i, (i + 1)) == "/") {
          delimitador = i
        }
      }
      var id_user = id_usuario.substring(0, delimitador);
      var correo = id_usuario.substring(delimitador + 1, id_usuario.length);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Eliminar Usuario',
        text: "¿Realemete quieres eliminar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          var datos = new URLSearchParams();
          datos.append("id_usuario", id_user)
          datos.append("correo", correo)
          swalWithBootstrapButtons.fire(
            fetch("/eliminar/usuario", {
              method: "post",
              body: datos
            }).then(res => res.json())
              .then(res => {
                'Eliminado',
                  'El usuario ha sido eliminado',
                  'Exito'
              })

          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'No se ha eliminado el usuario :)',
            'error'
          )
        }
      })
    })
  });



  var btn_actualizar = document.querySelectorAll('.btn_actualizar_usuario');
  btn_actualizar.forEach(boton => {
    boton.addEventListener('click', () => {
      $('#edit-usuario').modal('show');
      var id_usuario = boton.id
      var btn_confirmar = document.getElementById('btn_actualizar_usuario');
      btn_confirmar.addEventListener('click', () => {
        const rol = document.getElementById('rol').value
      
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Actualizar Usuario',
          text: "¿Realemete quieres volver administrador este usuario?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'si, actualizar',
          cancelButtonText: 'No, cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {

            //const rol = document.getElementById('rol').value
            var datos = new URLSearchParams();
            datos.append("id_usuario", id_usuario)
            datos.append("role", rol)
            swalWithBootstrapButtons.fire(
              fetch("/actualizar/rol/usuario", {
                method: "post",
                body: datos
              }).then(res => res.json())
                .then(res => {
                  if (res.status == "ok") {
                    'Actualizdo',
                      'El usuario ha sido actualizado',
                      'Exito'
                    window.location.href = res.url;
                  }
                })
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'No se ha actualizado el usuario :)',
              'error'
            )
          }
        })
      })




    })
  });





}