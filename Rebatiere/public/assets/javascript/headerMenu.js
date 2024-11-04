var reservationButton = document.querySelector(".myReservations");
var messageButton = document.querySelector(".profile-message");
var editButton= document.querySelector(".profile-edit");
var profileButton = document.querySelector(".profile-pic");
var logoutButton = document.querySelector(".profile-logout");

profileButton.addEventListener("click", () => {
    if (reservationButton.classList.contains('show')) {

        reservationButton.classList.remove('show');
        editButton.classList.remove('show');
        messageButton.classList.remove('show');
        logoutButton.classList.remove('showLogout');

        reservationButton.classList.add('hide');
        editButton.classList.add('hide');
        messageButton.classList.add('hide');
        logoutButton.classList.add('hideLogout');

        setTimeout(() => {
        reservationButton.classList.remove('hide');
        editButton.classList.remove('hide');
        messageButton.classList.remove('hide');
        logoutButton.classList.remove('hideLogout');
    }, 500)
        
    } else {
        reservationButton.classList.add('show');
        editButton.classList.add('show');
        messageButton.classList.add('show');
        logoutButton.classList.add('showLogout');
  
    }
});