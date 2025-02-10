document.addEventListener('DOMContentLoaded', () => {

    // Récupération des différents "calques" de la carte des chambres (Plan entier, RDC, 1er étage, 2ème étage)
    const layer0Element = document.getElementById('layer0');
    const layer1Element = document.getElementById('layer1');
    const layer2Element = document.getElementById('layer2');
    const layer3Element = document.getElementById('layer3');
    
    // Récupération des boutons servant à afficher ou cacher les calques (individuellement)
    const btnRDC = document.getElementById('btnRDC');
    const btnDeuxiemeEtage = document.getElementById('btnDeuxiemeEtage');
    const btnPremierEtage = document.getElementById('btnPremierEtage');
    // Placement des boutons qui nous intéressent dans un tableau
    const floorButtonsArray = [
      {button: btnRDC, layer: layer2Element}, 
      {button: btnDeuxiemeEtage, layer: layer3Element},
      {button: btnPremierEtage, layer: layer1Element }
    ];

    // On récupère l'ensemble des boutons de chambres (en pierre)
    const chamberButtons = document.querySelectorAll(".chambre-btn");
    // On récupère également tous ces boutons individuellement avec leur id, dans un objet
    const chamberButtonsObject = {
      'dortoirPetit': document.getElementById('dortoirPetit'),
      'dortoirGrand': document.getElementById('dortoirGrand'),
      'chambreBleue': document.getElementById('chambreBleue'),
      'jeanClaude': document.getElementById('jeanClaude'),
      'alex': document.getElementById('alex'),
      'fenetre': document.getElementById('fenetre'),
      'fond': document.getElementById('fond'),
      'milieu': document.getElementById('milieu'),
      'nicole': document.getElementById('nicole'),
      'gauche': document.getElementById('gauche'),
      'dehors1': document.getElementById('dehors1'),
      'dehors2': document.getElementById('dehors2'),
      'bureau': document.getElementById('bureau'),
  };

  // Dans un objet "chambres", on récupère toutes les chambres grâce à leur id, chaque élément représente la chambre "découpée" sur la map
    const chambres = {
      chambre1: document.getElementById('chambre1'),
      chambre2: document.getElementById('chambre2'),
      chambre3: document.getElementById('chambre3'),
      chambre4: document.getElementById('chambre4'),
      chambre5: document.getElementById('chambre5'),
      chambre6: document.getElementById('chambre6'),
      chambre7: document.getElementById('chambre7'),
      chambre8: document.getElementById('chambre8'),
      chambre9: document.getElementById('chambre9'),
      chambre10: document.getElementById('chambre10'),
      chambre11: document.getElementById('chambre11'),
      chambre12: document.getElementById('chambre12'),
      chambre13: document.getElementById('chambre13'),
    };

    // Dans un objet "boutons" on assigne tous les calques à un tableau de boutons des chambres
    const buttonsObject = {
      'layer1': ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche'],
      'layer2': ['dehors1', 'dehors2', 'bureau'],
      'layer3': ['nicole']
    };

    // On attribue des actions sur le click pour chaque bouton d'étage
    floorButtonsArray.forEach(({button, layer}) => {
        button.addEventListener('click', () => {
          layer0Element.style.display = 'block';
          layer1Element.style.display = 'none';
          layer2Element.style.display = 'none';
          layer3Element.style.display = 'none';

        if (layer) {
          layer.style.display = 'block';
          // Attention confusion possible : layer.id renvoie à une chaine de caractère (exemple :"layer1" pour layer1Element)

          // 1- On laisse apparaitre seulement le boutons de chambres correspondants à l'étage
              // On commence par masquer tous les boutons de chambre
                chamberButtons.forEach(chamberButton => {
                  chamberButton.style.display = 'none';
              });
              // On affiche ensuite seulement les boutons associés à l'étage sélectionné
                buttonsObject[layer.id].forEach(
                  buttonId => {
                  const button = document.getElementById(buttonId);
                  if (button) {
                    button.style.display = 'block';
                  }
                });

          // 2- On laisse apparaitre seulement les vignettes de chambres correspondantes à l'étage
              // On commence par masquer toutes les vignettes de chambre par défaut
                Object.values(chambres).forEach(chambre => chambre.style.display = 'none');

                if (layer.id === 'layer1') {
                    ['chambre1', 'chambre5', 'chambre6', 'chambre7', 'chambre8', 'chambre9', 'chambre10', 'chambre11', 'chambre12'].forEach(id => {
                        chambres[id].style.display = 'block';
                    });
                } else if (layer.id === 'layer2') {
                    ['chambre2', 'chambre3', 'chambre4'].forEach(id => {
                        chambres[id].style.display = 'block';
                    });
                } else if (layer.id === 'layer3') {
                    ['chambre13'].forEach(id => {
                        chambres[id].style.display = 'block';
                    });
                }

          // 3 - On définit les boutons de chambres cliquables
            // Définir toutes les boutons de chambres comme non cliquables par défaut
                Object.values(chamberButtonsObject).forEach(chamberButton => {
                  chamberButton.classList.add('not-clickable');
                });

                if (layer.id === 'layer1') {
                    ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.remove('not-clickable');
                    });
                    ['dehors1', 'dehors2', 'bureau', 'nicole'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.add('not-clickable');
                    });

                } else if (layer.id === 'layer3') {
                    ['nicole'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.remove('not-clickable');
                    });
                    ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche', 'dehors1', 'dehors2', 'bureau'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.add('not-clickable');
                    });

                } else if (layer.id === 'layer2') {
                    ['dehors1', 'dehors2', 'bureau'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.remove('not-clickable');
                    });
                    ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'nicole', 'gauche'].forEach(id => {
                        if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.add('not-clickable');
                    });
                }
              }
      });
    });
      

  });
  