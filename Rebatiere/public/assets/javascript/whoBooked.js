const buttonDate = document.getElementById('toggleDate');
// const membersBox = document.querySelector('.membersBox');
// const buttonMembers = document.getElementById('toggleMembers');
// const box = document.querySelector('.box');

// let isAnimating = false;

buttonDate.addEventListener('click', async () => {

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
            // map.style.display = "none";

            formSheet.classList.add('recenter');

            setTimeout(() => {
                formContainer.classList.remove('position');
                formSheet.classList.remove('recenter');
                buttonDate.innerHTML=">";
                isAnimating = false; 
            }, 1500);

        }, 350); // Correspond à la durée de l'animation de fermeture de la map
    } else {
        formContainer.classList.add('expanded');
        formContainer.classList.add('position');
        // map.style.display = "block";
        
        setTimeout(() => {
            box.style.visibility = 'visible';
            box.classList.add('show');
            buttonDate.innerHTML="<";
            isAnimating = false;
        }, 350); // Correspond à la durée de l'animation d'extension du formContainer
    }

});

function checkTotalReservations(fromDate, toDate) {
    fetch(`/api/reservations-period?from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Total de réservations sur cette période : ${data.count}`);
            data.reservations.forEach(reservation => {
                console.log(`${reservation.firstname} ${reservation.lastname} a réservé la chambre ${reservation.chamber_name} du ${reservation.start} au ${reservation.end}`);
            });
        })
        .catch(error => console.error('Erreur:', error));
}



