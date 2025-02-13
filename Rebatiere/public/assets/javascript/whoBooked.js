const buttonWhoBooked = document.getElementById('buttonWhoBooked');
console.log (buttonWhoBooked);
const usersBookingContainer = document.getElementById('usersBookingContainer');
const bookingList = usersBookingContainer.querySelector('ul');

// const membersBox = document.querySelector('.membersBox');
// const buttonMembers = document.getElementById('toggleMembers');
// const box = document.querySelector('.box');

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
    }
    });

    // AFFICHAGE - Déroulement du formulaire sur la droite
    buttonWhoBooked.addEventListener('click', async () => {
        // Cliquer lors de l'animation n'execute pas l'action
        if (isAnimating) return;
            isAnimating = true;
            // 
            if (usersBookingContainer.classList.contains('show')) {
                buttonMembers.click();
                await new Promise(resolve => setTimeout(resolve, 2200));
            }
            // Si membersBox est ouvert
            if (box.classList.contains('show')) {
                box.classList.remove('show');
                box.classList.add('hide');
                bookingList.textContent = "";
                // bookingList.style.display = 'none';
                setTimeout(() => {
                    box.style.visibility = 'hidden';
                    box.classList.remove('hide');  
                    formContainer.classList.remove('expanded');
                    formSheet.classList.add('recenter');
                    setTimeout(() => {
                        formContainer.classList.remove('position');
                        formSheet.classList.remove('recenter');
                        buttonWhoBooked.innerHTML=">";
                        isAnimating = false; 
                    }, 1500);
    
                }, 350); // Correspond à la durée de l'animation de fermeture de la map
            } else {
                // Si membersBox n'est pas ouvert on l'étend et on ajuste sa position
                formContainer.classList.add('expanded');
                formContainer.classList.add('position');

                // On crée une div dans le box qui va contenir nos informations
                usersBookingContainer.classList.add("show");
                
                setTimeout(() => {
                    box.style.visibility = 'visible';
                    box.classList.add('show');
                    buttonWhoBooked.innerHTML="<";
                    isAnimating = false;
                }, 350); // Correspond à la durée de l'animation d'extension du formContainer
            }
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



