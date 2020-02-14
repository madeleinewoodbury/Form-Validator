const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isValidEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid email');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
}

// function checkIsMatch(input1, input2) {
//   if (input1.value !== input2.value) {
//     showError(input1, 'Passwords must match');
//   } else {
//     showSuccess(input1);
//   }
// }

function checkPasswords() {
  if (password.value === password2.value) {
    showSuccess(password2);
  } else {
    showError(password2, 'Passwords must match');
  }
}

function getFieldName(input) {
  if (input.id === 'password2') {
    return 'Confirm password';
  } else {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkInputLength(username, 3, 25);
  checkInputLength(password, 6, 15);
  isValidEmail(email);
  if (password2.value !== '') {
    checkPasswords();
  }
});
