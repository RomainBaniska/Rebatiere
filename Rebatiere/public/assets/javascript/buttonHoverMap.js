// Récupération de la full black shape
const layer4 = document.getElementById('layer4');

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

// Récupération des boutons
const boutons = {
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


Object.keys(boutons).forEach(function(boutonKey, index) {
    const bouton = boutons[boutonKey];
    const chambreKey = `chambre${index + 1}`;
    const chambre = chambres[chambreKey];

    if (bouton && chambre) {
        bouton.addEventListener('mouseenter', function() {

            // Lorsque la souris entre sur le bouton, les éléments ont un zoom.
            chambre.classList.remove('zoom-animationEnd');
            chambre.classList.add('zoom-animation');
            chambre.style.zIndex = 9999;

            layer4.classList.remove('shadowing-animationEnd');
            layer4.classList.add('shadowing-animation');
             
        });

        bouton.addEventListener('mouseleave', function() {
            
            chambre.classList.remove('zoom-animation');
            chambre.classList.add('zoom-animationEnd');


            chambre.style.zIndex = 4;

            // // On attend la fin de l'animation de déZoom avant de refaire passer l'élément en z-index 4
            // chambre.addEventListener('animationend', function onAnimationEnd(event) {
            //     if (event.animationName === 'zoom-animationEnd') {
            //         chambre.style.zIndex = 4; 
            //         chambre.removeEventListener('animationend', onAnimationEnd); // Supprimer l'écouteur
            //     }
            // });


            layer4.classList.remove('shadowing-animation');
            layer4.classList.add('shadowing-animationEnd');
        });
    }
});
