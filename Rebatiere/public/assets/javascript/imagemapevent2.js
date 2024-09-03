document.addEventListener('DOMContentLoaded', function() {
    var areas = document.querySelectorAll('area');

    areas.forEach(function(area) {
      area.addEventListener('click', function(event) {
        switch (area.id) {
            case 'dortoirFond':
                // Action à exécuter pour le dortoir du fond
                console.log('Dortoir du fond sélectionné');
                break;
              case 'dortoirPetits':
                // Action à exécuter pour le dortoir des petits
                console.log('Dortoir des petits sélectionné');
                break;
              case 'chambreBleue':
                // Action à exécuter pour la chambre bleue
                console.log('Chambre bleue sélectionnée');
                break;
              case 'jean-Claude':
                // Action à exécuter pour Jean-Claude
                console.log('Jean-Claude sélectionné');
                break;
              case 'alex':
                // Action à exécuter pour Alex
                console.log('Alex sélectionné');
                break;
              case 'fenetre':
                // Action à exécuter pour la fenêtre
                console.log('Fenêtre sélectionnée');
                break;
              case 'fond':
                // Action à exécuter pour le fond
                console.log('Fond sélectionné');
                break;
              case 'milieu':
                // Action à exécuter pour le milieu
                console.log('Milieu sélectionné');
                break;
              case 'nicole':
                // Action à exécuter pour Nicolas
                console.log('Nicole sélectionné');
                break;
              case 'gauche':
                // Action à exécuter pour la zone gauche
                console.log('Zone gauche sélectionnée');
                break;
              case 'dehors1':
                // Action à exécuter pour la zone gauche
                console.log('Zone dehors1 sélectionnée');
                break;
              case 'dehors2':
                // Action à exécuter pour la zone gauche
                console.log('Zone dehors2 sélectionnée');
                break;
              case 'bureau':
                // Action à exécuter pour la zone gauche
                console.log('Zone bureau sélectionnée');
                break;
                
              default:
                console.log('Zone non gérée');
        }
      });
    });
  });