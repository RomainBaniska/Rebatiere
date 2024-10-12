const button = document.getElementById('toggleButton');
const box = document.querySelector('.box');
const map = document.querySelector('.map');
const formContainer = document.getElementById('formSheetContainer');
const formSheet = document.getElementById('formSheet');
let isAnimating = false;

button.addEventListener('click', () => {

    if (isAnimating) return;

    isAnimating = true;

    if (box.classList.contains('show')) {
        box.classList.remove('show');
        box.classList.add('hide');

        
        setTimeout(() => {
            box.style.visibility = 'hidden';
            box.classList.remove('hide');  

            formContainer.classList.remove('expanded');
            map.style.display = "none";

            formSheet.classList.add('recenter');

            setTimeout(() => {
                formContainer.classList.remove('position');
                formSheet.classList.remove('recenter');
                button.innerHTML=">";
                isAnimating = false; 
            }, 1500);

        }, 350); // Correspond à la durée de l'animation de fermeture de la map
    } else {
        formContainer.classList.add('expanded');
        formContainer.classList.add('position');
        map.style.display = "block";
        
        setTimeout(() => {
            box.style.visibility = 'visible';
            box.classList.add('show');
            button.innerHTML="<";
            isAnimating = false;
        }, 350); // Correspond à la durée de l'animation d'extension du formContainer
    }
});

// Mise à jour de l'encadré "chambre sélectionnée"
function updateDisplay(name) {
    document.getElementById('displayBox').textContent = name;
}

 // Récupération de la valeur de l'encadré "chambre sélectionnée" depuis l'hidden input
 document.querySelector('form').addEventListener('submit', function() {
    const displayBoxValue = document.getElementById('displayBox').textContent;
    document.getElementById('chamberInput').value = displayBoxValue.replace(/[\s']/g, ''); /* REGEX sans espace ni apostrophe */
    console.log("le script s est executé");
});
