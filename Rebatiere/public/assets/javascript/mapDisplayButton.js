const buttonMap = document.getElementById('toggleButton');
// const buttonMembers = document.getElementById('toggleMembers');
const box = document.querySelector('.box');
const map = document.querySelector('.map');
const formContainer = document.getElementById('formSheetContainer');
const formSheet = document.getElementById('formSheet');
let isAnimating = false;

buttonMap.addEventListener('click', async () => {

    if (isAnimating) return;

    isAnimating = true;

    // Si membersBox est ouvert, on le referme (toggleMembers dans usersDisplayButton.js)
    if (membersBox.classList.contains('show')) {
        buttonMembers.click();

        await new Promise(resolve => setTimeout(resolve, 2200));
    }

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
                buttonMap.innerHTML=">";
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
            buttonMap.innerHTML="<";
            isAnimating = false;
        }, 350); // Correspond à la durée de l'animation d'extension du formContainer
    }

});

// Boutons des chambres
const chambreButtons = document.querySelectorAll('.chambre-btn');

// Ajouter un gestionnaire de clic à chaque bouton
chambreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const chambreName = button.getAttribute('data-chambre');
        const chambreId = button.getAttribute('data-id');
        
        updateDisplay(chambreName);

        document.getElementById('chamberInput').value = chambreId;
    });
});


// Mise à jour de la displayBox pour récupérer l'Id (value) de la chambre sélectionnée
function updateDisplay(name) {
    document.getElementById('displayBox').textContent = name;
}

