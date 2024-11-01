let buttons = document.getElementsByClassName("chambre-btn");

Array.from(buttons).forEach(button => {
  button.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let container = document.getElementsByClassName("validation-container")[0];
    canvas.width = 600;
    canvas.height = 600;

    container.appendChild(canvas);

    let confetti_button = confetti.create(canvas);
    confetti_button().then(() => container.removeChild(canvas));
  });
});