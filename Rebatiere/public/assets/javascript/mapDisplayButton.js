const button = document.getElementById('toggleButton');
const box = document.querySelector('.box');
const map = document.querySelector('.map');
const formContainer = document.getElementById('formSheetContainer');

button.addEventListener('click', () => {
    if (box.classList.contains('show')) {
        box.classList.remove('show');
        box.classList.add('hide');

        
        setTimeout(() => {
            box.style.visibility = 'hidden';
            box.classList.remove('hide');
            
            formContainer.classList.remove('expanded');
            formContainer.style.justifyContent = "center";
            map.style.display = "none";



        }, 350); // Correspond à la durée de l'animation de fermeture de la map
    } else {
        formContainer.classList.add('expanded');
        formContainer.style.justifyContent = "flex-start";
        map.style.display = "block";
        
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
