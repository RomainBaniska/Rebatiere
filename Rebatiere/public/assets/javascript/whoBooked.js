const buttonDate = document.getElementById('toggleDate');
const usersBookingContainer = document.getElementById('usersBookingContainer');
// const membersBox = document.querySelector('.membersBox');
// const buttonMembers = document.getElementById('toggleMembers');
// const box = document.querySelector('.box');

// let isAnimating = false;

let fromDate = null;
let toDate = null;

    buttonDate.addEventListener('click', () => {
        // On récupère les valeurs de from et to si elles existent
        fromDate = document.getElementById("from").value;
        toDate = document.getElementById("to").value;

    // Si la date de début et la date de fin sont rentrées
    if (fromDate && toDate) {
        // Appeler la fonction checkTotalReservations avec les dates sélectionnées
        checkTotalReservations(fromDate, toDate);

    } else {
        console.log("Veuillez sélectionner les deux dates.");
    }
    });

    // Méthode appelée qui donne les réservations existantes en fonction des dates renseignées
    function checkTotalReservations(fromDate, toDate) {
        fetch(`/api/reservations-period?from=${fromDate}&to=${toDate}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total de réservations sur cette période : ${data.count}`);
                data.reservations.forEach(reservation => {
                    console.log(`${reservation.firstname} ${reservation.lastname} a réservé la chambre ${reservation.chambername} du ${new Date(reservation.start.date).toLocaleDateString()} au ${new Date(reservation.end.date).toLocaleDateString()}`);
                    

                
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // AFFICHAGE - Déroulement du formulaire sur la droite
    buttonDate.addEventListener('click', async () => {
        if (isAnimating) return;
        
            isAnimating = true;
            // Si membersBox est ouvert, on le referme (toggleMembers dans usersDisplayButton.js)
            // if (membersBox.classList.contains('show')) {
            if (usersBookingContainer.classList.contains('show')) {
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
                    formSheet.classList.add('recenter');
                    setTimeout(() => {
                        formContainer.classList.remove('position');
                        formSheet.classList.remove('recenter');
                        buttonDate.innerHTML=">";
                        isAnimating = false; 
                    }, 1500);
    
                }, 350); // Correspond à la durée de l'animation de fermeture de la map
            } else {
                // Si membersBox n'est pas ouvert on l'étend et on ajuste sa position
                formContainer.classList.add('expanded');
                formContainer.classList.add('position');

                // On crée une div dans le box qui va contenir nos informations
                // let userBookings = document.createElement("div");
                usersBookingContainer.classList.add("show");
                usersBookingContainer.textContent = "Nouvelle div ajoutée !";
                console.log('YAAAAAAAAAAAY!');
                // Ajoute la nouvelle div à la div existante
                // usersBookingContainer.appendChild(userBookings);

                
                setTimeout(() => {
                    box.style.visibility = 'visible';
                    box.classList.add('show');
                    buttonDate.innerHTML="<";
                    isAnimating = false;
                }, 350); // Correspond à la durée de l'animation d'extension du formContainer
            }
    });



