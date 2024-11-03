var reservationButton = document.querySelector(".myReservations");
var messageButton = document.querySelector(".profile-message");
var editButton= document.querySelector(".profile-edit");
var profileButton = document.querySelector(".profile-pic");
var logoutButton = document.querySelector(".profile-logout");

profileButton.addEventListener("click", () => {
    if (!reservationButton.classList.contains('show')) {
        reservationButton.classList.add('show');
        editButton.classList.add('show');
        messageButton.classList.add('show');
        logoutButton.classList.add('show');
    } else {
        reservationButton.classList.remove('show');
        editButton.classList.remove('show');
        messageButton.classList.remove('show');
        logoutButton.classList.remove('show');
    }
});