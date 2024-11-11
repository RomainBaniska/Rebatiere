
document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form"); 
const profileImageInput = document.getElementById("profileImageInput");
const imageToCrop = document.getElementById("imageToCrop");
const cropOutput = document.getElementById('cropOutput');
const cropImageBtn = document.getElementById('cropImageBtn');
const croppedImageJPGFile = document.getElementById('croppedImageJPGFile');
const reader = new FileReader();

// On initialise le cropper et la croppedImage
let cropper;
let croppedImage = null; 

// Lorsque on sélectionne une image depuis "Pacourir", on fait apparaitre l'outil (encadrage) de cropping sur celle-ci.

    profileImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        
        if (file) {
            reader.onload = (fileEvent) => {
                imageToCrop.src = fileEvent.target.result;
                imageToCrop.style.display = "block";

                 if (cropper) {
                    cropper.destroy();
                }

                imageToCrop.onload = () => {
                    cropper = new Cropper(imageToCrop, {
                        aspectRatio: 1,
                        viewMode: 0,
                        zoomable: false
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    });

// Je configure le bouton du cropper ("Crop!") pour qu'il crée un élément <canvas> qui contient la zone rognée par l'utilisateur. | Par défaut, toDataURL() utilise le format PNG (je change en jpg)
// On remplit la source de l'img "cropOutput" auparavant vide par l'url en base64
    cropImageBtn.addEventListener('click', function () {
        croppedImage = cropper.getCroppedCanvas().toDataURL("image/jpg");
        cropOutput.src = croppedImage;
    });


    // J'empêche l'envoi du formulaire lors de la soumission pour ajouter une action si on a une image croppée existe
    form.addEventListener("submit", (event) => {
        if (croppedImage) {
            event.preventDefault();

            // On décode la Base64 string
            const croppedImageData = croppedImage.split(',')[1];
            const croppedImageBinary = window.atob(croppedImageData);

            // On crée un blob de la data décodée
            const len = croppedImageBinary.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = croppedImageBinary.charCodeAt(i)
            }
            const blob = new Blob([bytes], { type: 'image/jpg'});

            // Créer un fichier à partir du blob
            const file = new File([blob], "croppedImage.jpg", { type: 'image/jpg' });

            // On utilise DataTransfer pour injecter le fichier dans le champ de téléchargement
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // Injection du fichier JPG dans l'input 
            croppedImageJPGFile.files = dataTransfer.files;

            console.log (croppedImageJPGFile.files);
            // return;

        // Utilisation d'un délai pour s'assurer que le fichier est bien injecté
        setTimeout(() => {
            form.submit();  // Soumettre le formulaire après l'injection du fichier
        }, 4000);


            // // On génère une URL pour le blob
            // const url = URL.createObjectURL(blob);

            // // On télécharge l'image 
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'image.jpg';
            // console.log(a);
            // console.log('OK!');
            // a.style.display = 'none'; // On cache l'élément dans le DOM
            // document.body.appendChild(a); // On l'ajoute temporairement au document
            // a.click(); // On déclenche le clic pour télécharger l'image
            // document.body.removeChild(a); // On le supprime ensuite du DOM
            // URL.revokeObjectURL(url); // On libère la mémoire de l'URL
            return;


        }
    });
             
});
