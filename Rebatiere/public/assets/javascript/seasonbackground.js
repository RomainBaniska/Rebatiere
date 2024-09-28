
function getSeasonClass(date, viewType) {
    let month;

    if (viewType === 'dayGridMonth') {
        // Dans le cas de la vue 'dayGridMonth', utilisez le mois du premier jour visible du mois
        let firstVisibleDate = new Date(date.getFullYear(), date.getMonth(), 1); 
        month = firstVisibleDate.getMonth(); 
    } else {
        // Pour les autres vues, utilisez simplement le mois de la date donnée
        month = date.getMonth();
    }

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
