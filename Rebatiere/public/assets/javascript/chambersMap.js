// CE SCRIPT GERE L'INTEGRALITE DES INTERACTIONS AVEC LA CARTE DES CHAMBRES ET LEUR SELECTION

document.addEventListener('DOMContentLoaded', () => {

    // Récupération des différents "calques" de la carte des chambres (Plan entier, RDC, 1er étage, 2ème étage)
    const layer0Element = document.getElementById('layer0');
    const layer1Element = document.getElementById('layer1');
    const layer2Element = document.getElementById('layer2');
    const layer3Element = document.getElementById('layer3');
    // Récupération de la carte des chambre "black shape"
    const layer4Element = document.getElementById('layer4');
    

    //On récupère l'ensemble des boutons servant à afficher ou cacher les calques
    const floorButtonsQS = document.querySelectorAll('.boutonEtage');
    //On leur passe une petite animation vite fait bien fait
    floorButtonsQS.forEach(arrow => {
        arrow.addEventListener('click', function() {
            arrow.classList.remove('shake'); 
            void arrow.offsetWidth;  // Recalcul du style
            arrow.classList.add('shake');
        });
    });
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
    // L'ordre de l'objet est important pour une instruction future
    const chamberButtonsObject = {
    chambrebleue: document.getElementById('chambreBleue'),
    bureau: document.getElementById('bureau'),
    dehors1: document.getElementById('dehors1'),
    dehors2: document.getElementById('dehors2'),
    dortoirGrand: document.getElementById('dortoirGrand'),
    dortoirPetit: document.getElementById('dortoirPetit'),
    fond: document.getElementById('fond'),
    fenetre: document.getElementById('fenetre'),
    gauche: document.getElementById('gauche'),
    jeanClaude: document.getElementById('jeanClaude'),
    milieuDroite: document.getElementById('alex'),
    milieu: document.getElementById('milieu'),
    nicole: document.getElementById('nicole')
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
      layer1: ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche'],
      layer2: ['dehors1', 'dehors2', 'bureau'],
      layer3: ['nicole']
    };

    // DEBUT FOREACH
    // On attribue des actions sur le click pour chaque bouton d'étage
    floorButtonsArray.forEach(({button, layer}) => {
        button.addEventListener('click', () => {
          layer0Element.style.display = 'block';
          layer1Element.style.display = 'none';
          layer2Element.style.display = 'none';
          layer3Element.style.display = 'none';

        // Si layer existe
        if (layer) {
          layer.style.display = 'block';
          // Attention confusion possible : layer.id renvoie à une chaine de caractère (exemple :"layer1" pour layer1Element)

          // 1- On laisse apparaitre seulement le boutons de chambres correspondants à l'étage
              // On commence par masquer tous les boutons de chambre (en vrac)
                chamberButtons.forEach(chamberButton => {
                  chamberButton.style.display = 'none';
              });
              // On affiche ensuite seulement les boutons associés à l'étage sélectionné
              buttonsObject[layer.id].forEach(id => {
                if (chamberButtonsObject[id]) {
                  chamberButtonsObject[id].style.display = 'block';
                }
              });
              

          // 2- On laisse apparaitre seulement les vignettes de chambres correspondantes à l'étage
              // On commence par masquer toutes les vignettes de chambre par défaut
                Object.values(chambres).forEach(chambre => chambre.style.display = 'none');

                // Puis on fait apparaitre les vignettes de chambre en fonction de l'étage
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

          // 3 - On définit les boutons de chambres cliquables (Non utilisé dans cette version /!\)
            // Définir tous les boutons de chambres comme non cliquables par défaut
                Object.values(chamberButtonsObject).forEach(chamberButton => {
                  chamberButton.classList.add('not-clickable');
                });

                if (layer.id === 'layer1') {
                    ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche'].forEach(id => {
                      // if (button) button.classList.remove('not-clickable');
                      if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.remove('not-clickable');
                    });
                    ['dehors1', 'dehors2', 'bureau', 'nicole'].forEach(id => {
                      // if (button) button.classList.add('not-clickable');
                      if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.add('not-clickable');
                    });

                } else if (layer.id === 'layer3') {
                    ['nicole'].forEach(id => {
                      // if (button) button.classList.remove('not-clickable');
                      if (chamberButtonsObject[id]) chamberButtonsObject[id].classList.remove('not-clickable');
                    });
                    ['dortoirPetit', 'dortoirGrand', 'chambreBleue', 'jeanClaude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche', 'dehors1', 'dehors2', 'bureau'].forEach(id => {
                      // if (button) button.classList.add('not-clickable');
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
              } // FIN IF layer
           }); // FIN EventListener click
        }); // FIN FOREACH

        
        // HOVER SUR LES BOUTONS DE CHAMBRES
        // Agrandissement des vignettes de chambre lors du survol des boutons de chambre
        Object.keys(chamberButtonsObject).forEach(function(boutonKey, index) {
          const bouton = chamberButtonsObject[boutonKey];
          const chambreKey = `chambre${index + 1}`;
          const chambre = chambres[chambreKey];
      
          if (bouton && chambre) {
              bouton.addEventListener('mouseenter', function() {
                  // Lorsque la souris entre sur le bouton, les éléments ont un zoom.
                  chambre.classList.remove('zoom-animationEnd');
                  chambre.classList.add('zoom-animation');
                  chambre.style.zIndex = 9999;
                  // Animation de la black shape
                  layer4Element.classList.remove('shadowing-animationEnd');
                  layer4Element.classList.add('shadowing-animation');  
              });
              bouton.addEventListener('mouseleave', function() {
                  // Retrait du zoom
                  chambre.classList.remove('zoom-animation');
                  chambre.classList.add('zoom-animationEnd');
                  // Changement d'index quand zoom-animationEnd qui se termine
                  chambre.addEventListener('animationend', function onAnimationEnd(event) {
                      // Vérifier que c'est bien l'animation zoom-animationEnd qui se termine
                      if (event.animationName === 'zoom-out') {
                          chambre.style.zIndex = 4;
                          chambre.removeEventListener('animationend', onAnimationEnd);
                      }
                  });
                  // Animation de retrait de la black shape
                  layer4Element.classList.remove('shadowing-animation');
                  layer4Element.classList.add('shadowing-animationEnd');
              });
          }
      });


      // GESTION DU BOUTON D'OUVERTURE DE LA CARTE DES CHAMBRES
      // Récupération des éléments du DOM
      const buttonMap = document.getElementById('buttonMap');
      const box = document.querySelector('.box');
      const mapContainer = document.querySelector('.mapContainer');
      const formContainer = document.getElementById('formSheetContainer');
      const formSheet = document.getElementById('formSheet');
      // Déclaration de la variable d'animation
      let isAnimating = false;

      // Lancement de l'animation d'ouverture de la carte des chambres lors du clic sur le bouton
      buttonMap.addEventListener('click', async () => {
          if (isAnimating) return;
          isAnimating = true;
          // Si membersBox est ouvert, on le referme (buttonMembers)
          if (membersBox.classList.contains('show')) {
              buttonMembers.click();
              await new Promise(resolve => setTimeout(resolve, 2200));
          }
          // Si la box est ouverte (prolongement de la fenêtre du formulaire), on la referme 
          if (box.classList.contains('show')) {
              box.classList.remove('show');
              box.classList.add('hide');
              setTimeout(() => {
                  box.style.visibility = 'hidden';
                  box.classList.remove('hide');  
                  formContainer.classList.remove('expanded');
                  mapContainer.style.display = "none";
                  // On repositionne le formulaire avec une petite animation
                  formSheet.classList.add('recenter');
                  // On replace le formulaire à la fin de son animation, l'illusion est parfaite
                  setTimeout(() => {
                      formContainer.classList.remove('position');
                      formSheet.classList.remove('recenter');
                      buttonMap.innerHTML=">";
                      isAnimating = false; 
                  }, 1500);
              }, 350); // Correspond à la durée de l'animation de fermeture de la map
            // Si la box est fermée, alors on l'ouvre lors du click
          } else {
              formContainer.classList.add('expanded');
              formContainer.classList.add('position');
              // On affiche la map
              mapContainer.style.display = "block";
              setTimeout(() => {
                  box.style.visibility = 'visible';
                  box.classList.add('show');
                  buttonMap.innerHTML="<";
                  isAnimating = false;
              }, 350); // Correspond à la durée de l'animation d'extension du formContainer
          }
    });

        // RECUPERATION DES INFORMATIONS DE LA CHAMBRE SELECTIONNEE
        // Ajouter un gestionnaire de clic à chaque bouton
          chamberButtons.forEach(button => {
            button.addEventListener('click', () => {
                const chambreName = button.getAttribute('data-chambre');
                const chambreId = button.getAttribute('data-id');
                updateDisplay(chambreName);
                document.getElementById('chamberInput').value = chambreId;
            });
          });
          // Mise à jour de la displayBox pour récupérer l'Id (value) de la chambre sélectionnée
          function updateDisplay(name) {
            document.getElementById('displayBox').textContent = name;
          }

          // BONUS : Ajout de petits confettis lors de la sélection de la chambre
          Array.from(chamberButtons).forEach(chamberButton => {
            chamberButton.addEventListener("click", () => {
              // On crée un élément canvas pour les confettis
              let confettiCanvas = document.createElement("canvas");
              // On récupère le validation-container (il s'agit de la div qui est parente de la "display-box", soit l'espace pour la sélection de chambre)
              let validationContainer = document.querySelector(".validation-container");
              // Dimension du canvas
              confettiCanvas.width = 600;
              confettiCanvas.height = 600;
              // On ajoute le canvas au validationContainer
              validationContainer.appendChild(confettiCanvas);
          
              // fonctions provenant de la bibliothèque confettis (cdn)
              let confettiButton = confetti.create(confettiCanvas);
              // Lorsque l'animation est terminée, suppression du canvas
              confettiButton().then(() => validationContainer.removeChild(confettiCanvas));
            });
          });
  });
  