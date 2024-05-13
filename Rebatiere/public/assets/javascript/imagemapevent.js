document.addEventListener('DOMContentLoaded', function() {
    var areas = document.querySelectorAll('area');

    areas.forEach(function(area) {
      area.addEventListener('click', function(event) {
        switch (area.id) {
            case 'DortoirFond':
                // Action à exécuter pour le dortoir du fond
                console.log('Dortoir du fond sélectionné');
                break;
              case 'DortoirPetits':
                // Action à exécuter pour le dortoir des petits
                console.log('Dortoir des petits sélectionné');
                break;
              case 'ChambreBleue':
                // Action à exécuter pour la chambre bleue
                console.log('Chambre bleue sélectionnée');
                break;
              case 'Jean-Claude':
                // Action à exécuter pour Jean-Claude
                console.log('Jean-Claude sélectionné');
                break;
              case 'Alex':
                // Action à exécuter pour Alex
                console.log('Alex sélectionné');
                break;
              case 'Fenetre':
                // Action à exécuter pour la fenêtre
                console.log('Fenêtre sélectionnée');
                break;
              case 'Fond':
                // Action à exécuter pour le fond
                console.log('Fond sélectionné');
                break;
              case 'Milieu':
                // Action à exécuter pour le milieu
                console.log('Milieu sélectionné');
                break;
              case 'Nicolas':
                // Action à exécuter pour Nicolas
                console.log('Nicolas sélectionné');
                break;
              case 'Gauche':
                // Action à exécuter pour la zone gauche
                console.log('Zone gauche sélectionnée');
                break;
              // Ajoutez les autres cas ici
              default:
                console.log('Zone non gérée');
        }
      });
    });
  });