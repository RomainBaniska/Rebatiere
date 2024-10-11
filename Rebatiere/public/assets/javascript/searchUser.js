let highlightedIndex = -1;

document.getElementById('userSearch').addEventListener('input', function () {

    const searchTerm = this.value;
    const userList = document.getElementById('user-list');

    if (searchTerm.length < 1) {
        userList.innerHTML = '';
        userList.style.display = 'none';
        highlightedIndex = -1;
        return;
    }

    fetch(`/api/search-users?term=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        userList.innerHTML = '';
        highlightedIndex = -1;

        data.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = user.username;
            li.classList.add('uList');

            // Gestion du clic pour sélectionner l'utilisateur
            li.addEventListener('click', function () {
                document.getElementById('userSearch').value = user.username;
                userList.innerHTML = '';
                userList.style.display = 'none';
            });

            // Gestion du hover pour surligner avec la souris
            li.addEventListener('mouseover', function () {
                updateHighlight(userList.getElementsByTagName('li'), index);
                highlightedIndex = index; // Met à jour l'index de surlignage avec la souris
            });

            userList.appendChild(li);
        });

        userList.style.display = data.length > 0 ? 'block' : 'none';
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        userList.innerHTML = '';
        userList.style.display = 'none';
    });
});

document.getElementById('userSearch').addEventListener('keydown', function (e) {
    const userList = document.getElementById('user-list');
    const items = userList.getElementsByTagName('li');

    if (items.length > 0) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex < items.length - 1) ? highlightedIndex + 1 : 0;
            updateHighlight(items, highlightedIndex);
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex > 0) ? highlightedIndex - 1 : items.length - 1;
            updateHighlight(items, highlightedIndex);
        }

        if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            document.getElementById('userSearch').value = items[highlightedIndex].textContent;
            userList.innerHTML = '';
            userList.style.display = 'none';
        }
    }
});

// Fonction pour surligner l'élément actif
function updateHighlight(items, index) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('highlight');
    }
    if (index >= 0 && items[index]) {
        items[index].classList.add('highlight');
    }
}
