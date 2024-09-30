const button = document.getElementById('toggleButton');
const box = document.querySelector('.box');
const formContainer = document.getElementById('formSheetContainer');

// Fonction pour gérer l'extension et la rétractation du formContainer et l'ouverture/fermeture de la map
button.addEventListener('click', () => {
    if (box.classList.contains('show')) {
        // Si la map est visible, on la ferme avant de rétracter le formContainer
        box.classList.remove('show');
        box.classList.add('hide');
        
        setTimeout(() => {
            box.style.visibility = 'hidden';
            box.classList.remove('hide');
            
            // Une fois la map fermée, on rétracte le formContainer
            formContainer.classList.remove('expanded');
        }, 350); // Correspond à la durée de l'animation de fermeture de la map
    } else {
        // Étendre d'abord le formContainer avant d'ouvrir la map
        formContainer.classList.add('expanded');
        
        setTimeout(() => {
            box.style.visibility = 'visible';
            box.classList.add('show');
        }, 350); // Correspond à la durée de l'animation d'extension du formContainer
    }
});

// Mise à jour de l'encadré "chambre sélectionnée"
function updateDisplay(name) {
    document.getElementById('displayBox').textContent = name;
}
