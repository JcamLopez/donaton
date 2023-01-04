
$(document).ready(function () {
    $('#results').pageMe({
        pagerSelector: '#donantes_page',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 10
    });
});

$("#tb").bootstrapTable({
    paginación: verdadero, // Si se muestra la barra de paginación
    pageSize: 3, // Número de filas que se muestran en una página
    paginationLoop: false, // Si se abre el bucle infinito de la barra de paginación, haga clic en la página siguiente cuando la última página se convierta en la primera página
    pageList: [5, 10, 20] // Seleccione cuántas filas se muestran en cada página. Si los datos son demasiado pequeños, puede ser ineficaz
});