const perfil = document.getElementById('perfil');
if (perfil != undefined && perfil != null && perfil != "") {

    const nacionalidad = document.getElementById('nacionalidad')
    const cuenta = document.getElementById('tipo_cuenta')
    const cargar_nacionalidad = () => {
        fetch("/cargar-nacionalidad", {
            method: "post",
        }).then(res => res.json())
            .then(res => {
                llenar_nacionalidad(res);
            })
    }

    const llenar_nacionalidad = (datos) => {
        for (let i = 0; i < datos.nacionalidad.length; i++) {
            const selector = document.createElement('option');
            selector.text = datos.nacionalidad[i].na;
            nacionalidad.appendChild(selector);
        }
    }



    const cargar_tipo_cuenta = () => {
        fetch("/tipo-cuenta", {
            method: "post",
        }).then(res => res.json())
            .then(res => {
                llenar_tipo_de_cuenta(res.cuenta, res.tipo)
            })
    }

    const llenar_tipo_de_cuenta = (datos) => {
        datos.forEach(element => {
            const option= document.createElement('option');
            option.text = element;
            cuenta.appendChild(option);
        });

    }

  








    const main = () => {
        cargar_nacionalidad()
        cargar_tipo_cuenta();
    }

    main();
}
