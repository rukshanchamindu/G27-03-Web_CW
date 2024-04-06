
const form = document.querySelector('form');
const confirmationMessage = document.getElementById('confirmation-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    confirmationMessage.style.display = 'block';

    setTimeout(function() {
        form.reset();
        confirmationMessage.style.display = 'none';
    }, 3000);
});

function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Please enter your name.");
        return false;
    }

    if (email !== "" && !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}


