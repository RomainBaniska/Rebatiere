document.addEventListener('DOMContentLoaded', () => {
    const layer0 = document.getElementById('layer0');
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const layer3 = document.getElementById('layer3');
    
    const btnRDC = document.getElementById('btnRDC');
    const btnDeuxiemeEtage = document.getElementById('btnDeuxiemeEtage');
    const btnPremierEtage = document.getElementById('btnPremierEtage');

    // Conditionnement des area(s)
    
    const areas = {
      'dortoirPetits': document.getElementById('dortoirPetits'),
      'dortoirFond': document.getElementById('dortoirFond'),
      'chambrebleue': document.getElementById('ChambreBleue'),
      'jean-Claude': document.getElementById('jean-Claude'),
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

  // Récupération des chambres
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

    // Visibilité des éléments animés "chambre[n°] en fonction du layer"

    function toggleChambreVisibility(layer) {
      // Masquer toutes les chambres par défaut
      Object.values(chambres).forEach(chambre => chambre.style.display = 'none');

      if (layer === 'layer1') {
          ['chambre1', 'chambre5', 'chambre6', 'chambre7', 'chambre8', 'chambre9', 'chambre10', 'chambre11', 'chambre12'].forEach(id => {
              chambres[id].style.display = 'block';
          });
      } else if (layer === 'layer2') {
          ['chambre2', 'chambre3', 'chambre4'].forEach(id => {
              chambres[id].style.display = 'block';
          });
      } else if (layer === 'layer3') {
          ['chambre13'].forEach(id => {
              chambres[id].style.display = 'block';
          });
      }
  }
  
    function showLayer(layerToShow) {
      // Masquer les couches
      layer0.style.display = 'block';
      layer1.style.display = 'none';
      layer2.style.display = 'none';
      layer3.style.display = 'none';

      function setClickableAreas(layer) {
        // Définir toutes les zones comme non cliquables par défaut
        Object.values(areas).forEach(area => {
            area.classList.add('not-clickable');
        });

        if (layer === 'layer1') {
            ['dortoirPetits', 'dortoirFond', 'chambrebleue', 'jean-Claude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche'].forEach(id => {
                if (areas[id]) areas[id].classList.remove('not-clickable');
            });
            ['dehors1', 'dehors2', 'bureau', 'nicole'].forEach(id => {
                if (areas[id]) areas[id].classList.add('not-clickable');
            });

        } else if (layer === 'layer3') {
            ['nicole'].forEach(id => {
                if (areas[id]) areas[id].classList.remove('not-clickable');
            });
            ['dortoirPetits', 'dortoirFond', 'chambrebleue', 'jean-Claude', 'alex', 'fenetre', 'fond', 'milieu', 'gauche', 'dehors1', 'dehors2', 'bureau'].forEach(id => {
                if (areas[id]) areas[id].classList.add('not-clickable');
            });

        } else if (layer === 'layer2') {
            ['dehors1', 'dehors2', 'bureau'].forEach(id => {
                if (areas[id]) areas[id].classList.remove('not-clickable');
            });
            ['dortoirPetits', 'dortoirFond', 'chambrebleue', 'jean-Claude', 'alex', 'fenetre', 'fond', 'milieu', 'nicole', 'gauche'].forEach(id => {
                if (areas[id]) areas[id].classList.add('not-clickable');
            });
        }
    }
      
      if (layerToShow) {
        layerToShow.style.display = 'block';
        // exécute toggleChambreVisibility et lui passe l'argument layer
        toggleChambreVisibility(layerToShow.id);
        // exécute setclickable et lui passe l'argument layer
        setClickableAreas(layerToShow.id);
      }
    }
  
    btnRDC.addEventListener('click', () => {
      showLayer(layer2);
    });
  
    btnDeuxiemeEtage.addEventListener('click', () => {
      showLayer(layer3);
    });
  
    btnPremierEtage.addEventListener('click', () => {
      showLayer(layer1);
    });

  });
  