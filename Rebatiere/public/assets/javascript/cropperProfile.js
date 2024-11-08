
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

// Je configure le bouton du cropper ("Crop!") pour qu'il crée un élément <canvas> qui contient la zone rognée par l'utilisateur. | Par défaut, toDataURL() utilise le format PNG
// On remplit la source de l'img "cropOutput" auparavant vide par l'url en base64
    cropImageBtn.addEventListener('click', function () {
        croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
        cropOutput.src = croppedImage;
    });


    // J'empêche l'envoi du formulaire lors de la soumission pour ajouter une action si on a une image croppée existe
    document.querySelector("form").addEventListener("submit", (event) => {
        if (croppedImage) {
            event.preventDefault();
            console.log(croppedImage);
            // Appel de la fonction dataURLToBlob écrite plus bas
            const croppedImageBlob = dataURLToBlob(croppedImage);
            console.log(croppedImageBlob);
            console.log('Type MIME:', croppedImageBlob.type);  
            console.log('Taille du Blob:', croppedImageBlob.size); 
            return;
            }}); 

             
    // Je convertis la dataURL (base64) en blob pour créer un fichier binaire (jpg,gif...)
    function dataURLToBlob(dataURL) {
        const byteString = atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        
            for (let i = 0; i < byteString.length; i++) {
                uintArray[i] = byteString.charCodeAt(i);
            }
        
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            return new Blob([uintArray], { type: mimeString });
    }
});


   // if (croppedImageBlob) { 

                    // console.log('Blob:', croppedImageBlob);
                    // console.log('Type MIME:', croppedImageBlob.type);  // Type MIME, par exemple 'image/png'
                    // console.log('Taille du Blob:', croppedImageBlob.size);  // Taille du Blob en octets

                            // const formData = new FormData(event.target); // Création d'un FormData et ajout du blob
                            // formData.append("croppedImage", croppedImageBlob, "cropped-image.png");
                            // fetch(event.target.action, {method: "POST", body: formData})
                            //     .then(response => {console.log(response); return response.json()})
                            //     .then(data => {
                            //         console.log("Image envoyée avec succès", data);
                            //     })
                            // .catch(error => {
                            //     console.error("Erreur lors de l'envoi de l'image", error);
                            //     // console.log(event.target.action);  // Vérifie l'URL de la soumission
                            //     });
                            
        //                     fetch(event.target.action, {method: "POST", body: formData})
        //                     .then(response => {
        //                         if (!response.ok) {
        //                             return response.text().then(text => {
        //                                 console.error('Erreur dans la réponse du serveur :', text);
        //                                 throw new Error('Erreur serveur');
        //                             });
        //                         }
        //                         return response.json();
        //                     })
        //                     .then(data => {
        //                         console.log("Image envoyée avec succès", data);
        //                     })
        //                     .catch(error => {
        //                         console.error("Erreur lors de l'envoi de l'image", error);
        //                     });

        //         } else {console.error("Aucune image croppée n\'existe.");}
        // }
    // });
