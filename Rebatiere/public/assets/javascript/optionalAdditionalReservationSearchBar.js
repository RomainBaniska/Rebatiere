// CE SCRIPT GERE L'INTEGRALITE DES INTERACTIONS AVEC LA RESERVATION FACULTATIVE d'UTILISATEURS SUPPLEMENTAIRES

const searchBar = document.getElementById('userSearch'); // Barre de recherche
const userList = document.getElementById('user-list'); // Liste des utilisateurs trouvés (vide par défaut)
const duplicatedUsersContainer = document.querySelector('.membersBox'); // Utilisateurs "dupliqués"
// const buttonMap = document.getElementById('buttonMap');
let highlightedIndex = -1;
let selectedUsers = [];


    // INTERACTIONS AVEC LA SEARCHBAR
    // L'événement se déclenche lorsqu'on rentre un input dans la barre de recherche
    searchBar.addEventListener('input', function () {
        // On récupère la valeur de l'input sous la variable "searchTerm"
        const searchTerm = this.value;
        
        // Si la barre de recherche est inférieure à deux caractères, alors on retourne.
        if (searchTerm.length < 2) {
            userList.innerHTML = '';
            userList.style.display = 'none';
            highlightedIndex = -1;
            return;
        }

    // Autrement à partir de deux caractères, on fetch notre API.
    fetch(`/api/search-users?term=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        userList.innerHTML = '';
        highlightedIndex = -1;

        // Filtre les utilisateurs déjà sélectionnés
        const filteredData = data.filter(user => !selectedUsers.some(u => u.username === user.username));
        // Pour chaque utilisateur renvoyé on crée une ligne contenant l'username de l'utilisateur et on lui assigne la classe uList
        filteredData.forEach((user, index) => {
            const li = document.createElement('li');
            // La ligne contient le nom de l'utilisateur
            li.textContent = user.username;
            // Ajout d'une classe CSS à la ligne contenant le nom de l'utilisateur
            li.classList.add('uList');
            // Ajout au DOM de la ligne contenant le nom de l'utilisateur
            userList.appendChild(li);

            // Ensuite, lorsqu'on clique sur un élément de la liste on appelle la méthode addUser:
            li.addEventListener('click', function () {
                addUser(user); 
            });

            // Style de l'élément listé lors du hover avec la souris
            li.addEventListener('mouseover', function () {
                updateHighlight(userList.getElementsByTagName('li'), index);
                highlightedIndex = index; // Met à jour l'index de surlignage avec la souris
            });

            // Si les datas filtrées sont de taille supérieure à 0 caractère (existe), alors on fait apparaitre la userList
            if (filteredData.length > 0) {
                userList.style.display = 'block';
            } else {
                userList.style.display = 'none';
            }
        });        
    })
    // Fin des instructions du FETCH - Si le fetch échoue, on catch les erreurs
    .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        userList.innerHTML = '';
        userList.style.display = 'none';
    });
    }); // Fin de l'événement Input de la searchBar

    // SELECTION DE L'UTILISATEUR AVEC LES TOUCHES DU CLAVIER
    searchBar.addEventListener('keydown', function (e) {
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
                searchBar.value = '';
                userList.innerHTML = '';
                userList.style.display = 'none';
            }
        }
    });

    // METHODES POUR LA SEARCHBAR
    // Fonction pour surligner l'élément actif
    function updateHighlight(items, index) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('highlight');
        }
        if (index >= 0 && items[index]) {
            items[index].classList.add('highlight');
        }
    }

    // ...
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

        // vide par défaut le "membersBox" -> zone des utilisateurs dont le nom est dupliqué
        duplicatedUsersContainer.innerHTML = '';
        // On définit une constante d'une liste d'utilisateurs dupliqués
        const duplicatedUsersList = document.createElement('ul'); 
        duplicatedUsersList.classList.add('ulFlex');

        selectedUsers.forEach(user => {
            // Pour chaque utilisateur sélectionné, on crée un élément "ligne"
            const userItem = document.createElement('li'); 
            // à chaque ligne, on leur assigne la classe "duplicated"
            userItem.classList.add("duplicated");
            // Le contenu de l'item affiche le nom et prénom de l'utilisateur
            userItem.textContent = `${user.firstName} ${user.lastName}`; 

            // Crée une div pour les dates et la chambre
            const additionnalUsersContainer = document.createElement('div');
            // Ajoute la div à l'élément de liste
            userItem.appendChild(additionnalUsersContainer);
            duplicatedUsersList.appendChild(userItem); 

            // Ajoute les champs pour la date d'arrivée & la date de départ & la chambre
            additionnalUsersContainer.innerHTML = `
            <div class="extraContainer">
            <div class="extraLabels">
                <label for="from_${user.username}">Date d'arrivée</label>
                <label for="to_${user.username}">Date de départ</label>
                <label for="chamber_${user.username}">Chambre</label>
            </div>
            <div class="extraFields">
                <input type="hidden" id="user_id_${user.username}" name="members[${user.username}][id]" value="${user.id}">
                <input type="text" id="from_${user.username}" name="members[${user.username}][from]" autocomplete="off">
                <input type="text" id="to_${user.username}" name="members[${user.username}][to]" autocomplete="off">
                        <select id="chamber_${user.username}" name="members[${user.username}][chamber]">
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
        });

        duplicatedUsersContainer.appendChild(duplicatedUsersList); 

        selectedUsers.forEach(user => {
            $(`#from_${user.username}`).datepicker({numberOfMonths: 2}); 
            $(`#to_${user.username}`).datepicker({numberOfMonths: 2});  
        });
    }

    // GESTION DU BOUTON D'OUVERTURE DES RESERVATIONS SUPPLEMENTAIRES FACULTATIVES
    const map = document.querySelector('.map');
    const membersBox = document.querySelector('.membersBox');
    const members = document.querySelector('.members');
    const buttonMembers = document.getElementById('buttonAddReservations');
    const formSheetContainer = document.getElementById('formSheetContainer');
    let isAnimatingMembers = false;

    // La logique de dépliage de la map est comparable à celle de chambersMap.js
    buttonMembers.addEventListener('click', async () => {
        if (isAnimatingMembers) return;
        isAnimatingMembers = true;
    
        // Si map est ouvert, on le referme (la map)
        if (map.classList.contains('show')) {
            buttonMap.click();
            await new Promise(resolve => setTimeout(resolve, 2200));
        }
    
        if (membersBox.classList.contains('show')) {
            membersBox.classList.remove('show');
            membersBox.classList.add('hide');
    
            setTimeout(() => {
                formSheetContainer.style.alignItems = "center"
                membersBox.style.visibility = 'hidden';
                membersBox.classList.remove('hide');  
                formSheetContainer.classList.remove('expanded');
                members.style.display = "none";
                formSheet.classList.add('recenter');
    
                setTimeout(() => {
                    formSheetContainer.classList.remove('position');
                    formSheet.classList.remove('recenter');
                    buttonMembers.innerHTML=">";
                    isAnimatingMembers = false; 
                }, 1500);
    
            }, 350); 
        } else {
            formSheetContainer.style.alignItems = "start"
            formSheetContainer.classList.add('expanded');
            formSheetContainer.classList.add('position');
            members.style.display = "flex";
            
            setTimeout(() => {
                membersBox.style.visibility = 'visible';
                membersBox.classList.add('show');
                buttonMembers.innerHTML="<";
                isAnimatingMembers = false;
            }, 350);
        }
    });

