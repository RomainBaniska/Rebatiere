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
        const filteredData = data.filter(user => !selectedUsers.some(u => u.username === user.username));

        filteredData.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = user.username;
            li.classList.add('uList');

            // Gestion du clic pour sélectionner l'utilisateur
            li.addEventListener('click', function () {
                addUser(user); 
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

function addUser(user) {
    if (!selectedUsers.find(u => u.username === user.username)) {
        selectedUsers.push(user);  // Ajoute l'utilisateur entier à selectedUsers

        // Met à jour l'affichage des utilisateurs sélectionnés
        const selectedUsersContainer = document.getElementById('selectedUsersContainer');
        const userDiv = document.createElement('div');
        userDiv.textContent = `${user.username}`;
        userDiv.classList.add('selectedUser');
        selectedUsersContainer.appendChild(userDiv);

        // Met à jour le champ caché avec les utilisateurs sélectionnés
        document.getElementById('selectedUsers').value = selectedUsers.map(u => u.username).join(',');

        // Ajout d'un bouton pour retirer un utilisateur sélectionné
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('removeButton');
        userDiv.appendChild(removeButton);

        // Retirer l'utilisateur lorsqu'on clique sur 'x'
        removeButton.addEventListener('click', function () {
            selectedUsers = selectedUsers.filter(u => u.username !== user.username);
            userDiv.remove();
            document.getElementById('selectedUsers').value = selectedUsers.map(u => u.username).join(',');

            // Met à jour la div dupliquée quand un utilisateur est retiré
            updateDuplicatedUsers();
        });

        // Met à jour la div dupliquée
        updateDuplicatedUsers();
    }
}

// Duplication des noms d'utilisateur et détails dans la div "membersBox"
function updateDuplicatedUsers() {
    const duplicatedUsersContainer = document.querySelector('.membersBox');
    duplicatedUsersContainer.innerHTML = '';

    const userList = document.createElement('ul'); 
    userList.classList.add('ulFlex');

    selectedUsers.forEach(user => {
        const userItem = document.createElement('li'); 
        userItem.classList.add("duplicated");
        userItem.textContent = `${user.firstName} ${user.lastName}`; 

        // Crée une div pour les dates et la chambre
        const additionnalUsersContainer = document.createElement('div');

        // Ajoute les champs pour la date d'arrivée & la date de départ & la chambre
        additionnalUsersContainer.innerHTML = `
        <div class="extraContainer">
          <div class="extraLabels">
              <label for="from_${user.username}">Date d'arrivée</label>
              <label for="to_${user.username}">Date de départ</label>
              <label for="chamber_${user.username}">Chambre</label>
          </div>
          <div class="extraFields">
              <input type="text" id="from_${user.username}" name="from_${user.username}" autocomplete="off">
              <input type="text" id="to_${user.username}" name="to_${user.username}" autocomplete="off">
                    <select id="chamber_${user.username}" name="chamber_${user.username}">
                    <option value="">-- Sélectionner une chambre --</option>
                    <option value="3">ChambreDehors1</option>
                    <option value="4">ChambreDehors2</option>
                    <option value="5">ChambreBleue</option>
                    <option value="6">Jean-Claude</option>
                    <option value="7">ChambredAlex</option>
                    <option value="8">ChambreFenêtre</option>
                    <option value="9">ChambreduFond</option>
                    <option value="10">Dortoirdespetits</option>
                    <option value="11">Dortoirdesgrands</option>
                    <option value="12">ChambreNicole</option>
                    <option value="14">ChambreBureau</option>
                    <option value="15">Chambredegauche</option>
                    <option value="13">Chambredumilieu</option>
                </select>
          </div>
      </div>
      `;

        // Ajoute la div à l'élément de liste
        userItem.appendChild(additionnalUsersContainer);

       userList.appendChild(userItem); 
    });

    duplicatedUsersContainer.appendChild(userList); 

    selectedUsers.forEach(user => {
        $(`#from_${user.username}`).datepicker(); 
        $(`#to_${user.username}`).datepicker();  
    });
}

// Ajout des utilisateurs supplémentaires en hidden 

