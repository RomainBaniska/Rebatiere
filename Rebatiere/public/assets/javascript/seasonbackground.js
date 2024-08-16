// Fonction pour obtenir la classe de saison selon la date
function getSeasonClass(date) {
    var month = date.getMonth() + 1; // Les mois vont de 0 à 11

    if (month >= 1 && month <= 3) {
        return 'winter'; // Hiver
    } else if (month >= 4 && month <= 6) {
        return 'spring'; // Printemps
    } else if (month >= 7 && month <= 9) {
        return 'summer'; // Été
    } else {
        return 'fall'; // Automne
    }
}