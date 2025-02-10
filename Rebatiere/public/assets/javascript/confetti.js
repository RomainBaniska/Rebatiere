// Affiche des confettis lors d'une sélection de chambre

// On sélectionne tous les boutons des chambres (ceux en pierre avec le nom de la chambre) avec leur classe
const buttons = document.querySelectorAll(".chambre-btn"); // Commenté car déjà défini dans un script précédent

// Chaque bouton a un événement de click
Array.from(buttons).forEach(button => {
  button.addEventListener("click", () => {
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