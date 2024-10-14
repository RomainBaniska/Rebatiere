let highlightedIndex = -1;
let selectedUsers = [];

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

        // Filtre les utilisateurs déjà sélectionnés
        const filteredData = data.filter(user => !selectedUsers.includes(user.username));

        filteredData.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = user.username;
            li.classList.add('uList');

            // Gestion du clic pour sélectionner l'utilisateur
            li.addEventListener('click', function () {
                addUser(user.username);
                document.getElementById('userSearch').value = '';
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

        userList.style.display = filteredData.length > 0 ? 'block' : 'none';
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
            const selectedUsername = items[highlightedIndex].textContent;
            addUser(selectedUsername);
            document.getElementById('userSearch').value = '';
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

// Fonction pour ajouter un utilisateur sélectionné
function addUser(username) {
    if (!selectedUsers.includes(username)) {
        selectedUsers.push(username);

        // Met à jour l'affichage des utilisateurs sélectionnés
        const selectedUsersContainer = document.getElementById('selectedUsersContainer');
        const userDiv = document.createElement('div');
        userDiv.textContent = username;
        userDiv.classList.add('selectedUser');
        selectedUsersContainer.appendChild(userDiv);

        // Met à jour le champ caché avec les utilisateurs sélectionnés
        document.getElementById('selectedUsers').value = selectedUsers.join(',');

        // Ajout d'un bouton pour retirer un utilisateur sélectionné
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('removeButton');
        userDiv.appendChild(removeButton);

        // Retirer l'utilisateur lorsqu'on clique sur 'x'
        removeButton.addEventListener('click', function () {
            selectedUsers = selectedUsers.filter(user => user !== username);
            userDiv.remove();
            document.getElementById('selectedUsers').value = selectedUsers.join(',');
                      
            // Met à jour la div dupliquée quand un utilisateur est retiré
            updateDuplicatedUsers();
        });
        updateDuplicatedUsers();
    }
}

// Duplication des noms d'utilisateur et détails dans la div "membersBox"
function updateDuplicatedUsers() {
    const duplicatedUsersContainer = document.querySelector('.membersBox');
    duplicatedUsersContainer.innerHTML = ''; // Vide d'abord la div avant d'ajouter les nouveaux noms

    selectedUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.textContent = `${user.firstname} ${user.lastname} (${user.username})`; // Affiche firstname, lastname et username
        duplicatedUsersContainer.appendChild(userDiv);
    });
}
