// Animation ds boutons de la carte des chambres

function buttonShake(){
    const floorArrows = document.querySelectorAll('.boutonEtage');

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