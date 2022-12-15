
window.addEventListener('load', function(){
    new Glider(document.querySelector('.car_lista'), {
        slidesToShow: 3,
       // slidesToScroll: 3,
        dots: '.car_indicadores',
        arrows: {
          prev: '.anterior',
          next: '.siguiente'
        }
    });
});