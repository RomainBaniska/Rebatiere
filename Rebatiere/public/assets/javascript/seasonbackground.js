// // Fonction pour obtenir la classe de saison selon la date
// function getSeasonClass(date) {
//     var month = date.getMonth() + 1; // Les mois vont de 0 à 11

//     if (month >= 1 && month <= 3) {
//         return 'winter'; // Hiver
//     } else if (month >= 4 && month <= 6) {
//         return 'spring'; // Printemps
//     } else if (month >= 7 && month <= 9) {
//         return 'summer'; // Été
//     } else {
//         return 'fall'; // Automne
//     }
// }

function getSeasonClass(date) {
    let month = date.getMonth(); // 0 = janvier, 11 = décembre

    if (month >= 2 && month <= 4) {
        return 'spring';
    } else if (month >= 5 && month <= 7) {
        return 'summer';
    } else if (month >= 8 && month <= 10) {
        return 'autumn';
    } else {
        return 'winter';
    }
}

// function applySeasonalBackground(start, end) {
//     const calendarMonthView = document.querySelector('.fc-dayGridMonth-view');
//     if (!calendarMonthView) {
//         console.error('La vue du mois du calendrier n’a pas été trouvée.');
//         return;
//     }

//     const currentMonth = new Date(start).getMonth();
//     let backgroundClass = '';

//     if (currentMonth >= 2 && currentMonth <= 4) {
//         backgroundClass = 'spring-background';
//     } else if (currentMonth >= 5 && currentMonth <= 7) {
//         backgroundClass = 'summer-background';
//     } else if (currentMonth >= 8 && currentMonth <= 10) {
//         backgroundClass = 'autumn-background';
//     } else {
//         backgroundClass = 'winter-background';
//     }

//     console.log(`Applying background class: ${backgroundClass}`);
//         // Supprimer toutes les classes de fond existantes
//         calendarMonthView.classList.remove('spring-background', 'summer-background', 'autumn-background', 'winter-background');
//         // Ajouter la classe de fond actuelle
//         calendarMonthView.classList.add(backgroundClass);
//     }