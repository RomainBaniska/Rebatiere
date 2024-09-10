const boutonChambreBleue = document.getElementById('chambrebleue');
const chambre1 = document.getElementById('chambre1');

const boutonMilieu = document.getElementById('milieu');
const chambre2 = document.getElementById('chambre2');

const boutonDehors1 = document.getElementById('dehors1');
const chambre3 = document.getElementById('chambre3');

const boutonDehors2 = document.getElementById('dehors2');
const chambre4 = document.getElementById('chambre4');

const boutonDortoirFond = document.getElementById('dortoirFond');
const chambre5 = document.getElementById('chambre5');

const boutonDortoirPetits = document.getElementById('dortoirPetits');
const chambre6 = document.getElementById('chambre6');

const boutonDroite = document.getElementById('droite');
const chambre7 = document.getElementById('chambre7');

const boutonFenetre = document.getElementById('fenetre');
const chambre8 = document.getElementById('chambre8');

const boutonGauche = document.getElementById('gauche');
const chambre9 = document.getElementById('chambre9');

const boutonJeanClaude = document.getElementById('jean-Claude');
const chambre10 = document.getElementById('chambre10');

const boutonMilieuDroite = document.getElementById('milieuDroite');
const chambre11 = document.getElementById('chambre11');

const boutonBureau = document.getElementById('bureau');
const chambre12 = document.getElementById('chambre12');

const boutonNicole = document.getElementById('nicole');
const chambre13 = document.getElementById('chambre13');

// Répéter l'opération pour chaque bouton et chambre
boutonChambreBleue.addEventListener('mouseenter', function() {
    chambre1.classList.add('zoom-animation');
});
boutonChambreBleue.addEventListener('mouseleave', function() {
    chambre1.classList.remove('zoom-animation');
});

boutonMilieu.addEventListener('mouseenter', function() {
    chambre2.classList.add('zoom-animation');
});
boutonMilieu.addEventListener('mouseleave', function() {
    chambre2.classList.remove('zoom-animation');
});

boutonDehors1.addEventListener('mouseenter', function() {
    chambre3.classList.add('zoom-animation');
});
boutonDehors1.addEventListener('mouseleave', function() {
    chambre3.classList.remove('zoom-animation');
});

boutonDehors2.addEventListener('mouseenter', function() {
    chambre4.classList.add('zoom-animation');
});
boutonDehors2.addEventListener('mouseleave', function() {
    chambre4.classList.remove('zoom-animation');
});

boutonDortoirFond.addEventListener('mouseenter', function() {
    chambre5.classList.add('zoom-animation');
});
boutonDortoirFond.addEventListener('mouseleave', function() {
    chambre5.classList.remove('zoom-animation');
});

boutonDortoirPetits.addEventListener('mouseenter', function() {
    chambre6.classList.add('zoom-animation');
});
boutonDortoirPetits.addEventListener('mouseleave', function() {
    chambre6.classList.remove('zoom-animation');
});

boutonDroite.addEventListener('mouseenter', function() {
    chambre7.classList.add('zoom-animation');
});
boutonDroite.addEventListener('mouseleave', function() {
    chambre7.classList.remove('zoom-animation');
});

boutonFenetre.addEventListener('mouseenter', function() {
    chambre8.classList.add('zoom-animation');
});
boutonFenetre.addEventListener('mouseleave', function() {
    chambre8.classList.remove('zoom-animation');
});

boutonGauche.addEventListener('mouseenter', function() {
    chambre9.classList.add('zoom-animation');
});
boutonGauche.addEventListener('mouseleave', function() {
    chambre9.classList.remove('zoom-animation');
});

boutonJeanClaude.addEventListener('mouseenter', function() {
    chambre10.classList.add('zoom-animation');
});
boutonJeanClaude.addEventListener('mouseleave', function() {
    chambre10.classList.remove('zoom-animation');
});

boutonMilieuDroite.addEventListener('mouseenter', function() {
    chambre11.classList.add('zoom-animation');
});
boutonMilieuDroite.addEventListener('mouseleave', function() {
    chambre11.classList.remove('zoom-animation');
});

boutonBureau.addEventListener('mouseenter', function() {
    chambre12.classList.add('zoom-animation');
});
boutonBureau.addEventListener('mouseleave', function() {
    chambre12.classList.remove('zoom-animation');
});

boutonNicole.addEventListener('mouseenter', function() {
    chambre13.classList.add('zoom-animation');
});
boutonNicole.addEventListener('mouseleave', function() {
    chambre13.classList.remove('zoom-animation');
});
