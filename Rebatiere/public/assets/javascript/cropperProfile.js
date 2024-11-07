
document.addEventListener("DOMContentLoaded", () => {
const profileImageInput = document.getElementById("profileImageInput");
const imageToCrop = document.getElementById("imageToCrop");

// const imageToCrop2 = document.getElementById("imageToCrop2");
const cropImageBtn = document.getElementById('cropImageBtn');
const output = document.getElementById('output');

let cropper;

const reader = new FileReader();


// let cropper;

    profileImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        
        if (file) {
            reader.onload = (fileEvent) => {
                imageToCrop.src = fileEvent.target.result;
                imageToCrop.style.display = "block";
                 // Détruire l'ancien Cropper si l'image change
                 if (cropper) {
                    cropper.destroy();
                }

                // Initialiser le nouveau Cropper une fois l'image chargée
                imageToCrop.onload = () => {
                    cropper = new Cropper(imageToCrop, {
                        aspectRatio: 1,
                        viewMode: 0,
                        minCanvasWidth: imageToCrop.width,
                        minCanvasHeight: imageToCrop.height,
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    });

    cropper = new Cropper(imageToCrop, {aspectRatio: 1, viewMode: 0, minCanvasWidth: imageToCrop.width, minCanvasheight: imageToCrop.height,});

    cropImageBtn.addEventListener('click', function () {

            var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
            output.src = croppedImage;
    });

    // let cropper = new Cropper(imageToCrop, {
    //     aspectRatio : 1,
    //     viewMode : 0,
    // });

    // document.querySelector("form").addEventListener("submit", (event) => {
    //     if (cropper) {
    //         event.preventDefault(); // Empêcher l'envoi immédiat du formulaire

    //         cropper.getCroppedCanvas().toBlob((blob) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 croppedImageData.value = reader.result; // Enregistrer l'image en base64

    //                 // Soumettre le formulaire une fois l'image recadrée ajoutée
    //                 event.target.submit();
    //             };
    //             reader.readAsDataURL(blob); // Convertir le blob en base64
    //         });
    //     }
    // });
});
