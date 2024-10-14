// const formContainer = document.getElementById('formSheetContainer');
// const formSheet = document.getElementById('formSheet');
const membersBox = document.querySelector('.membersBox');
const members = document.querySelector('.members');
const buttonMembers = document.getElementById('toggleMembers');
let isAnimatingMembers = false;

buttonMembers.addEventListener('click', () => {

    if (isAnimatingMembers) return;

    isAnimatingMembers = true;

    if (membersBox.classList.contains('show')) {
        membersBox.classList.remove('show');
        membersBox.classList.add('hide');

        
        setTimeout(() => {
            formContainer.style.alignItems = "center"
            membersBox.style.visibility = 'hidden';
            membersBox.classList.remove('hide');  

            formContainer.classList.remove('expanded');
            members.style.display = "none";

            formSheet.classList.add('recenter');

            setTimeout(() => {
                formContainer.classList.remove('position');
                formSheet.classList.remove('recenter');
                buttonMembers.innerHTML=">";
                isAnimatingMembers = false; 
            }, 1500);

        }, 350); 
    } else {
        formContainer.style.alignItems = "start"
        formContainer.classList.add('expanded');
        formContainer.classList.add('position');
        members.style.display = "block";
        
        setTimeout(() => {
            membersBox.style.visibility = 'visible';
            membersBox.classList.add('show');
            buttonMembers.innerHTML="<";
            isAnimatingMembers = false;
        }, 350);
    }
});
