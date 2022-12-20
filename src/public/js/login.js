
const contenedorlogin = document.getElementById('contenedor-login');
if (contenedorlogin != undefined && contenedorlogin != null && contenedorlogin != "") {



    window.onload = function () {

        const $btnSignIn = document.querySelector('.sign-in-btn'),
            $btnSignUp = document.querySelector('.sign-up-btn'),
            $signUp = document.querySelector('.sign-up'),
            $signIn = document.querySelector('.sign-in');

        document.addEventListener('click', e => {
            if (e.target === $btnSignIn || e.target === $btnSignUp) {
                $signIn.classList.toggle('active');
                $signUp.classList.toggle('active')
            }
        });

        $.ajax({
            url: "/login",
            method: "GET",
            success: function (datos) {
                alert(datos)
               /*if (datos.status == "ok") {
                    window.location.href = datos.url;
                }*/

            },
            error: function (e) {
                alert("Error " + JSON.stringify(e));
            },
        });
    }


}
