const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  const requiredFields = document.querySelectorAll('input[required]');

  let emptyFields = false;
  requiredFields.forEach(function(field) {
    if (field.value === '') {
      emptyFields = true;
    }
  });

  if (emptyFields) {
    alert('Please fill in all required fields.');
  } else {
    alert('Order placed successfully.');
  }
});