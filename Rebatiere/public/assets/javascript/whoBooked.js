const buttonWhoBooked = document.getElementById('buttonWhoBooked');
console.log (buttonWhoBooked);
const usersBookingContainer = document.getElementById('usersBookingContainer');
const bookingList = usersBookingContainer.querySelector('ul');
const datepickerContainer = document.querySelector('.datepicker_container');

// Constantes déjà déclarées
// const membersBox = document.querySelector('.membersBox');
// const buttonMembers = document.getElementById('toggleMembers');
// const map = document.querySelector('.map');
// const buttonMap = document.getElementById('buttonMap');
// const formSheet = document.getElementById('formSheet');  

let isAnimating = false;
let fromDate = null;
let toDate = null;

    buttonWhoBooked.addEventListener('click', () => {
        // On récupère les valeurs de from et to si elles existent
        fromDate = document.getElementById("from").value;
        toDate = document.getElementById("to").value;

    // Si la date de début et la date de fin sont rentrées
    if (fromDate && toDate) {
        // Appeler la fonction checkTotalReservations avec les dates sélectionnées
        checkTotalReservations(fromDate, toDate);
    } else {
        console.log("Veuillez renseigner la date d'arrivée et de départ.");
        errorModal();
    }
    });

    // AFFICHAGE - Expension du formulaire sur la droite
    buttonWhoBooked.addEventListener('click', async () => {
        // Cliquer lors de l'animation n'execute pas l'action
        if (isAnimating) return;
            isAnimating = true;
            // Si le box des réservations additionnelles est ouverte on le ferme
            if (membersBox.classList.contains('show')) {
                buttonMembers.click();
                await new Promise(resolve => setTimeout(resolve, 2200));
            }
            // Si la map est ouverte, on la ferme
            if (map.classList.contains('show')) {
                buttonMap.click();
                await new Promise(resolve => setTimeout(resolve, 2200));
            }
            
            // // Si la Booking List box est ouverte
            // if (usersBookingContainer.classList.contains('show')) {

            //     // On aretire la classe "show" et on ajoute la classe "hide"
            //     usersBookingContainer.classList.remove('show');
            //     bookingList.classList.add('hide');
            //     // On vide le BookingList de son contenu et l'invisibilise
            //     bookingList.textContent = "";
            //     bookingList.style.display = 'none';
            //     bookingList.style.visibility = 'hidden';

            //     // setTimeout(() => {

            //     //     // bookingList.classList.remove('hide');  
            //     //     formContainer.classList.remove('expanded');
            //     //     formSheet.classList.add('recenter');
            //     //     setTimeout(() => {
            //     //         formContainer.classList.remove('position');
            //     //         formSheet.classList.remove('recenter');
            //     //         buttonWhoBooked.innerHTML=">";
            //     //         isAnimating = false; 
            //     //     }, 1500);
            //     // }, 350); // Correspond à la durée de l'animation de fermeture de la map

            // } else {
            //     // Si membersBox n'est pas ouvert on l'étend et on ajuste sa position
            //     formContainer.classList.add('expanded');
            //     formContainer.classList.add('position');

            //     // On crée une div dans le map qui va contenir nos informations
            //     usersBookingContainer.classList.add("show");
                
            //     setTimeout(() => {
            //         map.style.visibility = 'visible';
            //         map.classList.add('show');
            //         buttonWhoBooked.innerHTML="<";
            //         isAnimating = false;
            //     }, 350); // Correspond à la durée de l'animation d'extension du formContainer
            // }
    });

    // Méthode appelée qui donne les réservations existantes en fonction des dates renseignées
    function checkTotalReservations(fromDate, toDate) {
        fetch(`/api/reservations-period?from=${fromDate}&to=${toDate}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total de réservations sur cette période : ${data.count}`);
                data.reservations.forEach(reservation => {
                    bookingList.innerHTML += `<li> ${reservation.firstname} ${reservation.lastname} a réservé la chambre ${reservation.chambername} du ${new Date(reservation.start.date).toLocaleDateString()} au ${new Date(reservation.end.date).toLocaleDateString()} </li>`
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    function errorModal() {
        let modal = document.createElement("div");
        modal.textContent = "Veuillez renseigner la date d'arrivée et de départ.";
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
        }, 3000);
    }



