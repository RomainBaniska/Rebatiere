const button = document.getElementById('toggleButton');
const box = document.querySelector('.box');
button.addEventListener('click', () => {
    if (box.classList.contains('show')) {
        box.classList.remove('show');
        box.classList.add('hide');
        // Pour garder la div cachée après l'animation de zoom-out
        setTimeout(() => {
            box.style.visibility = 'hidden';
            box.classList.remove('hide');
        }, 700); // Correspond à la durée de l'animation
    } else {
        box.style.visibility = 'visible';
        box.classList.add('show');
    }
});

// Mise à jour de l'encadré "chambre sélectionnée

function updateDisplay(name) {document.getElementById('displayBox').textContent = name;}