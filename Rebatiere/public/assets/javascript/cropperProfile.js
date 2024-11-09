
document.addEventListener("DOMContentLoaded", () => {
const profileImageInput = document.getElementById("profileImageInput");
const imageToCrop = document.getElementById("imageToCrop");
const cropOutput = document.getElementById('cropOutput');
const cropImageBtn = document.getElementById('cropImageBtn');
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
    document.querySelector("form").addEventListener("submit", (event) => {
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

            // On génère une URL pour le blob
            const url = URL.createObjectURL(blob);

            // On télécharge l'image 
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.jpg';
            console.log(a);
            console.log('OK!');
            a.style.display = 'none'; // On cache l'élément dans le DOM
            document.body.appendChild(a); // On l'ajoute temporairement au document
            a.click(); // On déclenche le clic pour télécharger l'image
            document.body.removeChild(a); // On le supprime ensuite du DOM
            return;


        }
    });



    //         event.preventDefault();
    //         // Appel de la fonction dataURLToBlob écrite plus bas
    //         const croppedImageBlob = dataURLToBlob(croppedImage);
    //         // Ajout du Blob dans le hidden input
    //         const croppedImageField = document.getElementById('croppedImage');
    //         croppedImageField.value = croppedImageBlob; 

    //         // On décide d'envoyer l'image rognée sous forme de fichier Blob directement au contrôleur via une requête AJAX (par exemple, avec Fetch).
    //         // Pourquoi ? Parce qu'un controlleur ne peut pas avaler un objet Blob Javascript via un formulaire HTML

    //         // DEBUG
    //         // console.log(croppedImage);
    //         // console.log(croppedImageBlob);
    //         // console.log('Type MIME:', croppedImageBlob.type);  
    //         // console.log('Taille du Blob:', croppedImageBlob.size); 
    //         event.target.submit();
    //         }
    //     }); 

             
});
