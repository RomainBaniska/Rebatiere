function buttonShake(){
    const floorArrows = document.querySelectorAll('.fa-solid');

    floorArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            arrow.classList.remove('shake'); 
            void arrow.offsetWidth;  // Recalcul du style
            arrow.classList.add('shake');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    buttonShake();
});