const buttonWhoBooked = document.getElementById('buttonWhoBooked');
const usersBookingContainer = document.getElementById('usersBookingContainer');
const bookingList = usersBookingContainer.querySelector('ul');
const datepickerContainer = document.querySelector('.datepicker_container');

// Constantes déjà déclarées
// const membersBox = document.querySelector('.membersBox');
// const buttonMembers = document.getElementById('toggleMembers');
// const map = document.querySelector('.map');
// const buttonMap = document.getElementById('buttonMap');
// const formSheet = document.getElementById('formSheet');  
// const formSheetContainer = document.getElementById('formSheetContainer');  

let isAnimating = false;
let fromDate = null;
let toDate = null;
let quickModal = false;

    buttonWhoBooked.addEventListener('click', () => {
        // On récupère les valeurs de from et to si elles existent
        fromDate = document.getElementById("from").value;
        toDate = document.getElementById("to").value;

        // On crée une écriture de fromdate et todate en DD-MM-YYYY de manière à pas fausser la comparaison
        let fromDateObj = new Date(fromDate.split('-').reverse().join('-'));
        let toDateObj = new Date(toDate.split('-').reverse().join('-'));

    // Si la date de début et la date de fin sont rentrées
    if (fromDate && toDate) {
        // Si la date de départ est bien inférieure à la date d'arrivée, alors :
        // if (fromDate <= toDate) {
        if (fromDateObj <= toDateObj) {
        // Appeler la fonction checkTotalReservations avec les dates sélectionnées
        checkTotalReservations(fromDate, toDate);
        displayBookings();
        } else {
        // Sinon envoyer une erreur
        quickModal = true;
        errorModal();
        return;
        }
    } else {
        console.log("Veuillez renseigner la date d'arrivée et de départ.");
        errorModal();
        return;
    }
    });

    async function displayBookings () {
        // Cliquer lors de l'animation n'execute pas l'action
        if (isAnimating) return;
            isAnimating = true;

            // Si le box des réservations additionnelles est ouverte on le ferme
            if (membersBox.classList.contains('show')) {
                buttonMembers.click();
                await new Promise(resolve => setTimeout(resolve, 2200));
            }
            // Idem pour la map
            if (map.classList.contains('show')) {
                buttonMap.click();
                await new Promise(resolve => setTimeout(resolve, 2200));
            }

            // Si le conteneur n'est pas encore ouvert et qu'on clique alors :
            if (!usersBookingContainer.classList.contains('show')) {
            // On étend le formSheetContainer
            formSheetContainer.classList.add('expanded');
            formSheetContainer.classList.add('position');
            // On crée une div dans le map qui va contenir nos informations
            usersBookingContainer.classList.add("show");
            setTimeout(() => {
                buttonWhoBooked.innerHTML="<";
                bookingList.style.display = 'block';
                isAnimating = false;
            }, 350); // Correspond à la durée de l'animation d'extension du formSheetContainer
        } else {
            // Si la Booking List box est déjà ouverte
            usersBookingContainer.classList.remove("show");
            formSheetContainer.classList.remove('expanded');
            formSheet.classList.add('recenter');
            setTimeout(() => {
                formSheetContainer.classList.remove('position');
                formSheet.classList.remove('recenter');
                buttonWhoBooked.innerHTML=">";
                isAnimating = false; 
            }, 1500);
                bookingList.style.display = 'none';
            }
}

    // Méthode appelée qui donne les réservations existantes en fonction des dates renseignées
    function checkTotalReservations(fromDate, toDate) {
        fetch(`/api/reservations-period?from=${fromDate}&to=${toDate}`)
            .then(response => response.json())
            .then(data => {
                bookingList.innerHTML = "";
                console.log(`Total de réservations sur cette période : ${data.count}`);
                data.reservations.forEach(reservation => {
                    bookingList.innerHTML += `<li>${reservation.firstname} ${reservation.lastname} a réservé la chambre ${reservation.chambername} du ${new Date(reservation.start.date).toLocaleDateString()} au ${new Date(reservation.end.date).toLocaleDateString()} </li>`
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    function errorModal() {
        let modal = document.createElement("div");

        if (quickModal) {
            modal.textContent = "Dates invalides";
        } else {
            modal.textContent = "Veuillez renseigner la date d'arrivée et de départ.";
        }
        modal.style.backgroundColor = "red";
        modal.style.color = "white";
        modal.style.position = "absolute";
        modal.style.borderRadius = "4px";
        modal.style.padding = "3px";
        modal.style.margin = "3px";
        modal.style.top = "12%";
        modal.style.fontFamily = "Comic Sans MS";
        modal.style.fontSize = "10px"
        datepickerContainer.appendChild(modal);
        setTimeout(() => {
            datepickerContainer.removeChild(modal);
            quickModal = false;
        }, 3000);
    }



