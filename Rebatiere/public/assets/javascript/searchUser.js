// Déclaration de highlightedIndex au niveau global
let highlightedIndex = -1; 

document.getElementById('userSearch').addEventListener('input', function() {

    const searchTerm = this.value;
    const userList = document.getElementById('user-list');

    // Si la longueur du terme de recherche est inférieure à 1, on cache la liste.
    if (searchTerm.length < 1) {
        userList.innerHTML = '';
        userList.style.display = 'none';
        highlightedIndex = -1; // Réinitialiser l'index surligné
        return;
    }

    // Appel de l'API avec le terme de recherche
    fetch(`/api/search-users?term=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        userList.innerHTML = '';
        highlightedIndex = -1; // Réinitialiser l'index surligné

        // On parcourt les utilisateurs trouvés et on les ajoute à la liste
        data.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = user.username;
            li.classList.add('uList');

            // Ajouter un gestionnaire d'événement pour la sélection par clic
            li.addEventListener('click', function() {
                document.getElementById('userSearch').value = user.username;
                userList.innerHTML = ''; // Vider la liste après la sélection
                userList.style.display = 'none'; // Cacher la liste
            });

            userList.appendChild(li);
        });

        // Afficher la liste seulement s'il y a des résultats
        userList.style.display = data.length > 0 ? 'block' : 'none';
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        userList.innerHTML = ''; 
        userList.style.display = 'none'; 
    });
});

// Gestionnaire d'événement pour les touches "flèche haut", "flèche bas" et "Entrée"
document.getElementById('userSearch').addEventListener('keydown', function(e) {
    const userList = document.getElementById('user-list');
    const items = userList.getElementsByTagName('li');

    if (items.length > 0) {
        // Flèche bas
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (highlightedIndex < items.length - 1) {
                highlightedIndex++;
            } else {
                highlightedIndex = 0; // Revenir au premier élément si on atteint la fin
            }
            updateHighlight(items, highlightedIndex);
        }

        // Flèche haut
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (highlightedIndex > 0) {
                highlightedIndex--;
            } else {
                highlightedIndex = items.length - 1; // Revenir au dernier élément si on atteint le début
            }
            updateHighlight(items, highlightedIndex);
        }

        // Entrée
        if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedUser = items[highlightedIndex].textContent;
            document.getElementById('userSearch').value = selectedUser;
            userList.innerHTML = ''; // Vider la liste
            userList.style.display = 'none'; // Cacher la liste
        }
    }
});

// Fonction pour mettre à jour l'élément surligné
function updateHighlight(items, index) {
    // Supprimer le surlignage de tous les éléments
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('highlight');
    }

    // Ajouter le surlignage à l'élément actif
    if (index >= 0 && items[index]) {
        items[index].classList.add('highlight');
    }
}
